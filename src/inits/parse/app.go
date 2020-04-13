package parse

import (
	// "go-iris/main/inits/bindata/conf"

	"io/ioutil"

	"github.com/kataras/golog"
	"gopkg.in/yaml.v2"
)

//AppConfig 解析app.yml中的Other项
var (
	AppConfig appConfig
)

type appConfig struct {
	Port       string   `yaml:"Port"`
	IgnoreURLs []string `yaml:"IgnoreURLs"`
	JWTTimeout int64    `yaml:"JWTTimeout"`
	LogLevel   string   `yaml:"LogLevel"`
	Secret     string   `yaml:"Secret"`
}

//AppConfigParse App Config Parse
func AppConfigParse() {
	golog.Info("@@@ Init app conf")

	appData, err := ioutil.ReadFile("config/app.yaml")

	if err != nil {
		golog.Fatalf("Error. %s", err)
	}
	if err = yaml.Unmarshal([]byte(appData), &AppConfig); err != nil {
		golog.Fatalf("Error. %s", err)
	}

}
