package routes

import (
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/kirinlabs/HttpRequest"
	"gopkg.in/yaml.v2"
)

func Test_File_state_Get(t *testing.T) {
	appData, _ := ioutil.ReadFile("../../config/app.yaml")
	yaml.Unmarshal([]byte(appData), &AppConfig)
	urlStr := "http://" + AppConfig.IP + ":" + AppConfig.Port + "/non_real/filestate?sendSessionID=sdsd&fileName=abc.txt&filePath=%2Fhome%2Foliver%2F"

	res, _ := HttpRequest.Get(urlStr)
	body, _ := res.Body()
	fmt.Println(string(body))

}
func Test_Non_Real_Send_Command(t *testing.T) {
	appData, _ := ioutil.ReadFile("../../config/app.yaml")
	yaml.Unmarshal([]byte(appData), &AppConfig)
	comStr := `{"msgTag":"MCSMES", "missionID":"a",
	"msgType":"SJTZ", "subtype":"WJFS", 
	"MSGID":"s","sender":"OIM","timestamp":"2020-02-29_10:20:20",
	"content":{"sendSessionID":"a","filename":"s","filePath":"s","destination":"CTCC/BACC"}}`
	HttpRequest.JSON().Post("http://"+AppConfig.IP+":"+AppConfig.Port+"/non_real/send_command", comStr)

}
