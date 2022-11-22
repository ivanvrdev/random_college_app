export const formatDate = (datetime) => {
  const date = datetime.split("T")[0]
  const dateList = date.split("-")
  return `${dateList[2]}/${dateList[1]}/${dateList[0]}`
}