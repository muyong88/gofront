package gofrontdb

import (
	"sync"

	"github.com/yanzhen74/gofront/src/inits/parse"
	"github.com/yanzhen74/gofront/src/utils"

	"github.com/go-xorm/core"
	"github.com/kataras/golog"

	"github.com/go-xorm/xorm"
	_ "github.com/mattn/go-sqlite3" //引入sqlite3
)

var (
	masterEngine *xorm.Engine
	slaveEngine  *xorm.Engine
	lock         sync.Mutex
)
var (
	engineGroup *xorm.EngineGroup //主库写，从库读
	lockGroup   sync.Mutex
)

//EngineGroup 创建引擎组，读写分离，单例
func EngineGroup() *xorm.EngineGroup {
	if engineGroup != nil {
		goto EXIST
	}
	lockGroup.Lock()
	defer lockGroup.Unlock()
	engineGroup, _ = xorm.NewEngineGroup(MasterEngine(), []*xorm.Engine{SlaveEngine()})

	return engineGroup
EXIST:
	err := engineGroup.Ping()
	if err != nil {
		golog.Errorf("@@@ 数据库 引擎组 连接异常挂掉!! %s", err)
		engineGroup, _ = xorm.NewEngineGroup(MasterEngine(), SlaveEngine())
	}
	return engineGroup
}

//MasterEngine 主库，单例
func MasterEngine() *xorm.Engine {
	var (
		master = parse.DBConfig.Master
	)

	if masterEngine != nil {
		goto EXIST
	}

	lock.Lock()
	defer lock.Unlock()

	if masterEngine != nil {
		goto EXIST
	}

	createEngine(master, true)
	return masterEngine

EXIST:
	var err = masterEngine.Ping()
	if err != nil {
		golog.Errorf("@@@ 数据库 master 节点连接异常挂掉!! %s", err)
		createEngine(master, true)
	}
	return masterEngine
}

//SlaveEngine 从库，单例
func SlaveEngine() *xorm.Engine {
	var (
		slave = parse.DBConfig.Slave
	)

	if slaveEngine != nil {
		goto EXIST
	}

	lock.Lock()
	defer lock.Unlock()

	if slaveEngine != nil {
		goto EXIST
	}

	createEngine(slave, false)
	return slaveEngine

EXIST:
	var err = slaveEngine.Ping()
	if err != nil {
		golog.Errorf("@@@ 数据库 slave 节点连接异常挂掉!! %s", err)
		createEngine(slave, false)
	}
	return slaveEngine
}

func createEngine(dbInfo parse.DBConfigInfo, isMaster bool) {
	engine, err := xorm.NewEngine(dbInfo.Dialect, GetConnURL(isMaster))
	if err != nil {
		golog.Fatalf("@@@ 初始化数据库连接失败!! %s", err)
		return
	}
	//settings(engine, &dbIndo)

	engine.ShowSQL(dbInfo.ShowSQL)
	engine.SetMapper(core.SameMapper{}) //SnakeMapper 支持struct为驼峰式命名，表结构为下划线命名之间的转换，这个是默认的Maper
	engine.SetTZLocation(utils.SysTimeLocation)
	if dbInfo.MaxIdleConns > 0 {
		engine.SetMaxIdleConns(dbInfo.MaxIdleConns)
	}
	if dbInfo.MaxOpenConns > 0 {
		engine.SetMaxOpenConns(dbInfo.MaxOpenConns)
	}
	// 性能优化的时候才考虑，加上本机的SQL缓存
	//cacher := xorm.NewLRUCacher(xorm.NewMemoryStore(), 1000)
	//engine.SetDefaultCacher(cacher)

	if isMaster {
		masterEngine = engine
	} else {
		slaveEngine = engine
	}

}

//GetConnURL 获取数据库连接的url
// true：master主库
func GetConnURL(isMaster bool) (url string) {
	url = "./db/front_master.db"
	if !isMaster {
		url = "./db/front_slave.db"
	}
	//db, err := gorm.Open("mysql", "user:password@/dbname?charset=utf8&parseTime=True&loc=Local")
	// url = fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s",
	// 	info.User,
	// 	info.Password,
	// 	info.Host,
	// 	info.Port,
	// 	info.Database,
	// 	info.Charset)
	//golog.Infof("@@@ DB conn==>> %s", url)
	return
}
