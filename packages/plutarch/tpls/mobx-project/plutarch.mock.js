// plutarch.mock.js
module.exports = function(app){
  // 获取产品类目
  app.get('/api/category', 'attributes');

  // 获取产品属性
  app.get('/api/attributes', (req, res) => {
    const { query: { cid } } = req;

    if ( cid == 2 ){
      res.send({
        code: 200,
        success: true,
        data: [{
          id: 0, name: '品牌', order: 0, type: 'enum', options: [{
            name: '苹果', value: 'Iphone', id: 300
          }, {
            name: '华为', value: 'Huawei', id: 301
          }, {
            name: '小米', value: 'MI', id: 302
          }]
        }, {
          id: 1, name: '运行内存', order: 0, type: 'enum', options: [{
            name: '4GB', value: '4GB', id: 310
          }, {
            name: '6GB', value: '6GB', id: 311
          }, {
            name: '8GB', value: '8GB', id: 312
          }]
        }]
      });
    } else if ( cid == 3 ){
      res.send({
        code: 200,
        success: true,
        data: [{
          id: 2, name: '季节', order: 0, type: 'enum', options: [{
            name: '春季', value: 'spring', id: 401
          }, {
            name: '夏季', value: 'summer', id: 401
          }, {
            name: '秋季', value: 'autumn', id: 402
          }, {
            name: '冬季', value: 'winter', id: 403
          }]
        }]
      });
    };
  });

  // 产品列表
  app.get('/api/products', (req, res) => {
    res.send({
      code: 200,
      success: true,
      data: [{
        id: 136794125783912,
        name: '苹果8直降',
        cids: [0, 2],
        price: 4500,
        num: 999,
        desc: '苹果手机',
        status: 'offline'
      }]
    });
  });

  // 产品详情
  app.get('/api/product', (req, res) => {
    const { query: { id } } = req;
    res.send({
      code: 200,
      success: true,
      data: {
        id: 136794125783912,
        name: '苹果8直降',
        cids: [0, 2],
        attrValues: {0: [300], 1: [310]},
        price: 4500,
        num: 999,
        desc: '苹果手机'
      }
    });
  });

  // 产品保存、更新
  app.post('/api/product', (req, res) => {
    res.send({
      code: 200,
      data: {
        id: 12345456567
      },
      success: true
    });
  });

  // 产品删除
  app.delete('/api/product', (req, res) => {
    res.send({
      code: 200,
      data: true,
      success: true
    });
  });

}