package controller

import (
	"fmt"

	"github.com/kataras/iris/websocket"
	"github.com/yanzhen74/gofront/src/kafka"
	"github.com/yanzhen74/gofront/src/model"
)

var Consumers *[]*kafka.Consumer = new([]*kafka.Consumer)
var Producers *[]*kafka.Producer = new([]*kafka.Producer)
var WebSocketConn *model.WebsocketConnStruct
var NetConfig *model.NetWorks = new(model.NetWorks)

func Init_network(conf string) bool {
	// init net config
	netConfig, err := model.Read_network_config(conf)
	NetConfig = netConfig
	if err != nil {
		fmt.Printf("error is %v", err)
		return false
	}
	for _, network := range (*netConfig).NetWorkList {
		switch network.NetWorkName {
		case "Producer":
			var producer *kafka.Producer = new(kafka.Producer)
			_, err := producer.Init(&network)
			if err == nil {
				*Producers = append(*Producers, producer)
			}
		case "Consumer":
			var consumer *kafka.Consumer = new(kafka.Consumer)
			_, err := consumer.Init(&network)
			if err == nil {
				*Consumers = append(*Consumers, consumer)
			}
		default:
		}
	}
	return true
}

//receive data
func Run_network() bool {
	for _, c := range *Consumers {
		c.Receive()
	}
	return true
}

//send data to topic
func SendDataToTopic(topic string, data string) {
	for _, p := range *Producers {
		if p.Topic == topic {
			p.Send(data)
		}
	}
}

func SendWebsocketMsg(msg []byte) {
	if WebSocketConn != nil && WebSocketConn.Count > 0 {
		WebSocketConn.ConnServer.Broadcast(nil, websocket.Message{
			Namespace: WebSocketConn.Namespace,
			Room:      WebSocketConn.Room,
			Event:     "communicate", // fire the "onNewVisit" client event.
			Body:      msg,
		})
	}
}
