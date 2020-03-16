package model

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/pkg/errors"
)

type NetWorks struct {
	XMLName     xml.Name  `xml:"ROOT"`
	NetWorkList []NetWork `xml:"NetWork"`
}

type NetWork struct {
	XMLName         xml.Name `xml:"NetWork"`
	NetWorkSeqNum   string   `xml:"NetWorkSeqNum,attr"`
	NetWorkName     string   `xml:"NetWorkName,attr"`
	NetWorkIP       string   `xml:"NetWorkIP,attr"`
	NetWorkTopic    string   `xml:"NetWorkTopic,attr"`
	NetWorkProtocal string   `xml:"NetWorkProtocal,attr"`
}

func Read_network_config(filename string) (*NetWorks, error) {
	file, err := os.Open(filename)
	if err != nil {
		fmt.Printf("error: %v", err)
		return nil, err
	}
	defer file.Close()
	data, err := ioutil.ReadFile(filename)
	fmt.Println(string(data))
	if err != nil {
		fmt.Printf("error: %v", err)
		return nil, err
	}

	v := NetWorks{}
	err = xml.Unmarshal(data, &v)
	if err != nil {
		fmt.Printf("error: %v", err)
		return nil, err
	}

	fmt.Println(v)

	return &v, err
}

func (this *NetWorks) GetNetWorkByNetWorkSeqNum(seq string) (*NetWork, error) {
	for _, network := range this.NetWorkList {
		if network.NetWorkSeqNum == seq {
			return &network, nil
		}
	}
	return nil, errors.New("not exist network seq")
}
