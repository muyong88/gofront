package kafka

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Shopify/sarama"
	"github.com/yanzhen74/gofront/src/model"
)

type Producer struct {
	producer sarama.SyncProducer
	topic    string
}

func (this *Producer) Init(config *model.NetWork) (int, error) {
	fmt.Println("init kafka producer")
	conf := sarama.NewConfig()
	conf.Producer.Return.Successes = true
	conf.Producer.Timeout = 5 * time.Second
	p, err := sarama.NewSyncProducer([]string{config.NetWorkIP}, conf)
	if err != nil {
		log.Printf("sarama.NewSyncProducer err, message=%s \n", err)
		return -1, err
	}
	this.producer = p
	this.topic = config.NetWorkTopic
	return 1, nil
}

//produce data
func (this *Producer) Send(data string) error {
	msg := &sarama.ProducerMessage{
		Topic: this.topic,
		Value: sarama.ByteEncoder(data),
	}
	part, offset, err := this.producer.SendMessage(msg)
	if err != nil {
		log.Printf("send message(%s) err=%s \n", data, err)
		return err
	} else {
		fmt.Fprintf(os.Stdout, data+"发送成功，partition=%d, offset=%d \n", part, offset)
		return nil
	}
}
