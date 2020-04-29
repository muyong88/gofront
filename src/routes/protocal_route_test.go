package routes

import (
	"io/ioutil"
	"testing"

	"github.com/kirinlabs/HttpRequest"
	"gopkg.in/yaml.v2"
)

func Test_Protocal_Process_state_Post(t *testing.T) {
	appData, _ := ioutil.ReadFile("../../config/app.yaml")
	yaml.Unmarshal([]byte(appData), &AppConfig)
	var jsonStr = `
	{
		"msgType": "ProtocalReport",
		"PID": 1234,
		"MID": "CLOSE",
		"BID": "00112233",
		"ID": 1,
		"MainOrBackup": 1,
		"ProcessName": "LINK_CTCC-TL1A1_POAC",
		"Report": {
			"Report_type": "CP_REPORT_ON_TIMER",
			"Command_type": "bb",
			"Command_result": "bb",
			"Recv_status_revert": true,
			"Recv_status": false,
			"First": "20200320101020",
			"Last": "20200320102020",
			"Recv_count": 100,
			"Send_no": 100
		}
	}
	`
	HttpRequest.JSON().Post("http://"+AppConfig.IP+":"+AppConfig.Port+"/protocal/process_state", jsonStr)
}
func Test_Protocal_Send_Command(t *testing.T) {
	appData, _ := ioutil.ReadFile("../../config/app.yaml")
	yaml.Unmarshal([]byte(appData), &AppConfig)
	comStr := `{"msgType": "ProtocalCommand", "ID": 1,
	"MID": "HXC", "BID": "00112233", 
	"ProcessName": "LINK_CTCC-TL1A1_POAC","OrderSeq":1,"OrderName ":"START/STOP/OPEN/CLOSE/MODE/SEND/RESET/REPORT/ARCHIVE",
	"ParaInfo":{"MODE":"MAIN/BACKUP"},"Protocal":"LINK"}`
	HttpRequest.JSON().Post("http://"+AppConfig.IP+":"+AppConfig.Port+"/protocal/send_command", comStr)

}
