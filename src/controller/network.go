package controller

import (
	"fmt"

	"github.com/yanzhen74/gofront/src/kafka"
	"github.com/yanzhen74/gofront/src/model"
)

var consumers *[]*kafka.Consumer = new([]*kafka.Consumer)
var producers *[]*kafka.Producer = new([]*kafka.Producer)

func Init_network(conf string) bool {
	// init net config
	netConfig, err := model.Read_network_config(conf)
	if err != nil {
		fmt.Printf("error is %v", err)
		return false
	}
	for _, network := range (*netConfig).NetWorkList {
		switch network.NetWorkName {
		case "Producer":
			var producer *kafka.Producer = new(kafka.Producer)
			_, err := producer.Init(&network)
			if err != nil {
				*producers = append(*producers, producer)
			}
		case "Consumer":
			var consumer *kafka.Consumer = new(kafka.Consumer)
			_, err := consumer.Init(&network)
			if err != nil {
				*consumers = append(*consumers, consumer)
			}
		default:
		}
	}
	return true
}
func Run_network() bool {
	for _, c := range *consumers {
		c.Receive()
	}
	return true
}
