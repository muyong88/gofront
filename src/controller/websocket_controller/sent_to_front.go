package websocket_controller

import (
	"github.com/kataras/iris/websocket"
	"github.com/yanzhen74/gofront/src/model"
)

var WebSocketConn *model.WebsocketConnStruct

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
