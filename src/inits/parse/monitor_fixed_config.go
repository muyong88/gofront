package parse

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"
)

//全局变量
var (
	CCTCFIXLIST     = CTCCFixedList{}
	PROTOCALFIXLIST = ProtocalFixedList{}
)

//CTCCFixedList 列表
type CTCCFixedList struct {
	XMLName  xml.Name    `xml:"ROOT"`
	CTCCList []CTCCFixed `xml:"CTCC"`
}

//ProtocalFixedList 列表
type ProtocalFixedList struct {
	XMLName      xml.Name        `xml:"ROOT"`
	ProtocalList []ProtocalFixed `xml:"PROTOCAL"`
}

//CTCCFixed CTCC实时监控固定
type CTCCFixed struct {
	XMLName xml.Name `xml:"CTCC"`
	Seq     int      `xml:"SEQ,attr"`
	SysID   int      `xml:"SYSID,attr"`
	Channel int      `xml:"CHANNEL,attr"`
}

//ProtocalFixed 协议实时监控固定
type ProtocalFixed struct {
	XMLName      xml.Name `xml:"PROTOCAL"`
	Seq          int      `xml:"SEQ,attr"`
	MID          string   `xml:"MID,attr"`
	PROCESSNAME  string   `xml:"PROCESSNAME,attr"`
	MainOrBackUp int      `xml:"MAINORBACKUP,attr"`
	BID          string   `xml:"BID,attr"`
}

//ReadTableFixedConfig 读取filename配置
func ReadTableFixedConfig() {
	readCTCCFixedConfig("config/conf/ctcc_fixed_list.xml")
	readProtocalFixedConfig("config/conf/protocal_fixed_list.xml")
}

//readCTCCFixedConfig 读取filename配置
func readCTCCFixedConfig(fileName string) {
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	defer file.Close()
	data, err := ioutil.ReadFile(fileName)
	fmt.Println(string(data))
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	err = xml.Unmarshal(data, &CCTCFIXLIST)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	fmt.Println(CCTCFIXLIST)

}

//readProtocalFixedConfig 读取filename网络配置
func readProtocalFixedConfig(fileName string) {
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	defer file.Close()
	data, err := ioutil.ReadFile(fileName)
	fmt.Println(string(data))
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	err = xml.Unmarshal(data, &PROTOCALFIXLIST)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}

	fmt.Println(PROTOCALFIXLIST)
}

//GetSeqInCTCCTable 获取seq
func GetSeqInCTCCTable(sysid int, channel int) int {
	for _, v := range CCTCFIXLIST.CTCCList {
		if v.SysID == sysid && v.Channel == channel {
			return v.Seq
		}
	}
	return 0
}

//GetSeqInProtocalTable 获取seq
func GetSeqInProtocalTable(mid string, processname string, mainorbackup int) int {
	for _, v := range PROTOCALFIXLIST.ProtocalList {
		if v.MID == mid && v.PROCESSNAME == processname && v.MainOrBackUp == mainorbackup {
			return v.Seq
		}
	}
	return 0
}
