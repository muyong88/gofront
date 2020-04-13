package kafka

import (
	"fmt"
	"os"
	"time"

	"github.com/kataras/golog"

	"github.com/Shopify/sarama"
	"github.com/yanzhen74/gofront/src/model"
)

//Producer 生产者结构体
type Producer struct {
	producer sarama.SyncProducer
	Topic    string
}

//Init 初始化生产者
func (pro *Producer) Init(config *model.NetWork) (int, error) {
	fmt.Println("init kafka producer")
	conf := sarama.NewConfig()
	conf.Producer.Return.Successes = true
	conf.Producer.Timeout = 5 * time.Second
	p, err := sarama.NewSyncProducer([]string{config.NetWorkIP}, conf)
	if err != nil {
		golog.Errorf("sarama.NewSyncProducer err, message=%s \n", err)
		return -1, err
	}
	pro.producer = p
	pro.Topic = config.NetWorkTopic
	return 1, nil
}

//Send produce data
func (pro *Producer) Send(data string) error {
	msg := &sarama.ProducerMessage{
		Topic: pro.Topic,
		Value: sarama.ByteEncoder(data),
	}
	part, offset, err := pro.producer.SendMessage(msg)
	if err != nil {
		golog.Errorf("send message(%s) err=%s \n", data, err)
		return err
	}
	fmt.Fprintf(os.Stdout, data+"发送成功，partition=%d, offset=%d \n", part, offset)
	return nil

}
