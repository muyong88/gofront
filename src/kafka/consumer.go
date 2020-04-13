package kafka

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/Shopify/sarama"
	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/model"
)

//Consumer 消费者结构体
type Consumer struct {
	consumer           *sarama.Consumer
	partitionConsumers *[]*sarama.PartitionConsumer
	topic              string
}

//Init 利用配置初始化消费者
func (con *Consumer) Init(config *model.NetWork) (int, error) {
	fmt.Println("init kafka consumer")
	conf := sarama.NewConfig()
	conf.Consumer.Return.Errors = true
	conf.Version = sarama.V0_10_2_1
	conf.Consumer.MaxWaitTime = time.Duration(30) * time.Millisecond
	con.partitionConsumers = new([]*sarama.PartitionConsumer)
	ips := strings.Split(config.NetWorkIP, ";")
	con.topic = config.NetWorkTopic
	// consumer
	consumer, err := sarama.NewConsumer(ips, conf)
	if err != nil {
		fmt.Printf("consumer kafka create error %s\n", err.Error())
		golog.Errorf("consumer kafka create error %s\n", err.Error())
		return -1, err
	}
	con.consumer = &consumer
	partitionList, err := consumer.Partitions(config.NetWorkTopic)
	if err != nil {
		fmt.Println("Failed to get the list of partitions: ", err)
		golog.Errorf("Failed to get the list of partitions: ", err)
		return -1, err
	}
	for partition := range partitionList {
		partitionConsumer, err := consumer.ConsumePartition(config.NetWorkTopic, int32(partition), sarama.OffsetNewest)
		if err != nil {
			fmt.Printf("try create partitionConsumer error %s\n", err.Error())
			golog.Errorf("try create partitionConsumer error %s\n", err.Error())
			return -1, err
		}
		*(con.partitionConsumers) = append(*(con.partitionConsumers), &partitionConsumer)
	}
	return 1, nil
}

//Receive consume data
func (con *Consumer) Receive() {

	for _, partitionConsumer := range *(con.partitionConsumers) {
		go process(con.topic, *partitionConsumer)
	}

}
func process(topic string, partitionConsumer sarama.PartitionConsumer) {
	ticker := time.NewTicker(time.Millisecond * time.Duration(100))
	cases := initCases(partitionConsumer.Messages(),
		partitionConsumer.Errors(),
		ticker)
	for {
		chose, value, _ := reflect.Select(cases)

		switch chose {
		case 0: // chanMsg
			msg := (value.Interface()).(*sarama.ConsumerMessage)
			fmt.Printf("msg offset: %d, partition: %d, timestamp: %s, value: %s\n",
				msg.Offset, msg.Partition, msg.Timestamp.String(), string(msg.Value))
			msgM := model.Message{Content: msg.Value, Topic: topic}
			model.MsgChan <- msgM
		case 1: // chanErr
			err := (value.Interface()).(*sarama.ConsumerError)
			fmt.Printf("err :%s\n", err.Error())
			golog.Errorf("err :%s\n", err.Error())
		case 2: // timer

			// to be deleted , just for test now
			// }
		default: // send ok
			fmt.Println("customer default send ok ")
			fmt.Println(chose)
			cases = append(cases[:chose], cases[chose+1:]...)

		}
	}
}
func initCases(
	chanMsg <-chan *sarama.ConsumerMessage,
	chanErr <-chan *sarama.ConsumerError,
	ticker *time.Ticker) (cases []reflect.SelectCase) {

	// chan msg
	selectcase := reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(chanMsg),
	}
	cases = append(cases, selectcase)

	// chan err
	selectcase = reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(chanErr),
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
