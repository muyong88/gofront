package model

import "github.com/yanzhen74/gofront/src/gofrontdb"

//Users Users
type Users struct {
	UserName string `xorm:"notnull pk"  json:"username"`
	PassWord string `xorm:"notnull"  json:"password"`
	Role     int    `xorm:"notnull"`
}

//GetUserByNameAndPassword 查询一条
func GetUserByNameAndPassword(process *Users) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(process)
}
