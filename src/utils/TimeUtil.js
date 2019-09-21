export const formatTime = (time) => {

  let date = new Date(time);

  // 得到年
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  return `${year}-${month.toString().padStart(2, 0)}-${day.toString().padStart(2, 0)} ${h.toString().padStart(2, 0)}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)}`
}