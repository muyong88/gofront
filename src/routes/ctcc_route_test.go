package routes

import (
	"fmt"
	"testing"

	"github.com/kirinlabs/HttpRequest"
)

func Test_DownLink_Get(t *testing.T) {

	urlStr := "http://localhost:8080/ctcc/downlink?downlinkBeginTime=20200218162020&downlinkEndTime=20200218162040&pageSize=100&pageNo=0"

	res, _ := HttpRequest.Get(urlStr)
	body, _ := res.Body()
	fmt.Println(string(body))
}

func Test_CTCC_Process_state_Post(t *testing.T) {
	mapStr := map[string]interface{}{
		"msgType":              "CTCCFRONTEND_STATE_REPORT",
		"processId":            123,
		"sysId":                2,
		"pattern":              1,
		"channel":              1,
		"isSend32KB":           1,
		"isSendIPinIP":         1,
		"isSaveFile":           1,
		"isArchive":            1,
		"resendShmHead":        "1234567890",
		"resendShmTear":        "9876543210",
		"resendWriteShmLoop":   "12",
		"resendReadShmLoop":    "12",
		"resendWriteShmSpeed":  192.05,
		"resendReadShmSpeed":   191.23,
		"saveShmHead":          "1234567890",
		"saveShmTear":          "9876543210",
		"saveWriteShmLoop":     "12",
		"saveReadShmLoop":      "12",
		"saveWriteShmSpeed":    192.05,
		"saveReadShmSpeed":     191.23,
		"recvBeats":            1,
		"resendBeats":          1,
		"saveBeats":            1,
		"recvBytes":            "4829104024513",
		"send32KFrames":        "1923435",
		"sendIPinIPFrames":     "213421",
		"sendSmallCraftFrames": "0",
		"timeStamp":            "2018-11-29_14:02:43.423.5",
	}
	HttpRequest.JSON().Post("http://localhost:8080/ctcc/process_state", mapStr)

}

func Test_CTCC_Send_Command(t *testing.T) {
	comStr := `{"msgType": "CTCCFRONTEND_CONTROL", "Operation": "Open",
	"SysId": 2, "Pattern": 1, 
	"Channel": 1,"BeginTime":"202002291020","EndTime":"202002291020","MainHostName":"","BackupHostName":""}`
	HttpRequest.JSON().Post("http://localhost:8080/ctcc/send_command", comStr)

}
