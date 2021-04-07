/**
 * filterObject
 * 过滤数据
 * @param {obj} 过滤对象
 * @param {arr} 过滤所保留的key值集合
 */
export function filterObject(obj, arr) {
  if (typeof obj !== 'object' || !Array.isArray(arr)) {
    throw new Error('参数格式不正确')
  }
  const result = {}
  Object.keys(obj)
    .filter(key => arr.includes(key))
    .forEach(key => {
      result[key] = obj[key]
    })
  return result
}