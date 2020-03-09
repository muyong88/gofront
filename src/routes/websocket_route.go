package routes

import (
	"log"

	"github.com/kataras/iris"
	"github.com/kataras/iris/websocket"
	"github.com/yanzhen74/gofront/src/controller/websocket_controller"
	"github.com/yanzhen74/gofront/src/model"
)

const namespace = "default"

func WebsocketHub(party iris.Party) {
	websocket_controller.WebSocketConn = new(model.WebsocketConnStruct)
	websocket_controller.WebSocketConn.Count = 0
	web := party.Party("/echo")
	ws := websocket.New(
		websocket.DefaultGorillaUpgrader,
		serverEvents)
	web.Get("/", websocket.Handler(ws)) // websocket模块
}

// if namespace is empty then simply websocket.Events{...} can be used instead.
var serverEvents = websocket.Namespaces{
	namespace: websocket.Events{
		websocket.OnNamespaceConnected: func(nsConn *websocket.NSConn, msg websocket.Message) error {
			// with `websocket.GetContext` you can retrieve the Iris' `Context`.
			if websocket_controller.WebSocketConn.Count == 0 {
				websocket_controller.WebSocketConn.ConnServer = nsConn.Conn.Server()
				websocket_controller.WebSocketConn.Namespace = msg.Namespace
				websocket_controller.WebSocketConn.Room = msg.Room
			}
			websocket_controller.WebSocketConn.Count = websocket_controller.WebSocketConn.Count + 1
			ctx := websocket.GetContext(nsConn.Conn)
			log.Printf("[%s] connected to namespace [%s] with IP [%s]",
				nsConn, msg.Namespace,
				ctx.RemoteAddr())
			return nil
		},
		websocket.OnNamespaceDisconnect: func(nsConn *websocket.NSConn, msg websocket.Message) error {
			log.Printf("[%s] disconnected from namespace [%s]", nsConn, msg.Namespace)
			//regist_info(nsConn, 0)
			websocket_controller.WebSocketConn.Count = websocket_controller.WebSocketConn.Count - 1
			return nil
		},
		"communicate": func(nsConn *websocket.NSConn, msg websocket.Message) error {
			// room.String() returns -> NSConn.String() returns -> Conn.String() returns -> Conn.ID()
			log.Printf("[%s] sent: %s", nsConn, string(msg.Body))
			log.Printf("Server got: %s from [%s]", msg.Body, nsConn.Conn.ID())

			return nil
		},
	},
}
