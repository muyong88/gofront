package kafka

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/Shopify/sarama"
	"github.com/yanzhen74/gofront/src/model"
)

type Consumer struct {
	consumer            *sarama.Consumer
	partition_consumers *[]*sarama.PartitionConsumer
	topic               string
}

func (this *Consumer) Init(config *model.NetWork) (int, error) {
	fmt.Println("init kafka consumer")
	conf := sarama.NewConfig()
	conf.Consumer.Return.Errors = true
	conf.Version = sarama.V0_10_2_1
	conf.Consumer.MaxWaitTime = time.Duration(30) * time.Millisecond
	this.partition_consumers = new([]*sarama.PartitionConsumer)
	ips := strings.Split(config.NetWorkIP, ";")

	// consumer
	consumer, err := sarama.NewConsumer(ips, conf)
	if err != nil {
		fmt.Printf("consumer kafka create error %s\n", err.Error())
		return -1, err
	}
	this.consumer = &consumer
	partitionList, err := consumer.Partitions(config.NetWorkTopic)
	if err != nil {
		fmt.Println("Failed to get the list of partitions: ", err)
		return -1, err
	}
	for partition := range partitionList {
		partition_consumer, err := consumer.ConsumePartition(config.NetWorkTopic, int32(partition), sarama.OffsetNewest)
		if err != nil {
			fmt.Printf("try create partition_consumer error %s\n", err.Error())
			return -1, err
		}
		*(this.partition_consumers) = append(*(this.partition_consumers), &partition_consumer)
	}
	return 1, nil
}

//consume data
func (this *Consumer) Receive() {

	for _, partition_consumer := range *(this.partition_consumers) {
		go process(this.topic, *partition_consumer)
	}

}
func process(topic string, partition_consumer sarama.PartitionConsumer) {
	ticker := time.NewTicker(time.Millisecond * time.Duration(100))
	cases := init_cases(partition_consumer.Messages(),
		partition_consumer.Errors(),
		ticker)
	for {
		chose, value, _ := reflect.Select(cases)

		switch chose {
		case 0: // chan_msg
			msg := (value.Interface()).(*sarama.ConsumerMessage)
			fmt.Printf("msg offset: %d, partition: %d, timestamp: %s, value: %s\n",
				msg.Offset, msg.Partition, msg.Timestamp.String(), string(msg.Value))
			msgM := model.Message{Content: msg.Value, Topic: topic}
			model.MsgChan <- msgM
		case 1: // chan_err
			err := (value.Interface()).(*sarama.ConsumerError)
			fmt.Printf("err :%s\n", err.Error())
		case 2: // timer

			// to be deleted , just for test now
			//for _, c := range *this.subscribers {
			// c.NetChanFrame <- "hello world"
			// }
		default: // send ok
			fmt.Println("customer default send ok ")
			fmt.Println(chose)
			cases = append(cases[:chose], cases[chose+1:]...)

		}
	}
}
func init_cases(
	chan_msg <-chan *sarama.ConsumerMessage,
	chan_err <-chan *sarama.ConsumerError,
	ticker *time.Ticker) (cases []reflect.SelectCase) {

	// chan msg
	selectcase := reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(chan_msg),
	}
	cases = append(cases, selectcase)

	// chan err
	selectcase = reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(chan_err),
	}
	cases = append(cases, selectcase)

	// timer
	selectcase = reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(ticker.C),
	}
	cases = append(cases, selectcase)

	return
}
