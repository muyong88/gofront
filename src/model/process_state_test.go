package model

import (
	"fmt"
	"io/ioutil"
	"os"
	"testing"
)

func Test_GetUserFromJson(t *testing.T) {
	jsonFile, err := os.Open("example.json")
	defer jsonFile.Close()
	if err != nil {
		t.Fatal("Error open json file ", err)
	}
	jsonData, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		t.Fatal("Error reading json data", err)
	}
	z, err := GetUserFromJson(jsonData)
	if err != nil {
		t.Fatal("Error getting struct Process_State", err)
	}
	fmt.Println((*z))
}
