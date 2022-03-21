export const formatDate = (d: string) => {
  const date = new Date(d)

  if (isNaN(date.getTime())) {
    return d
  } else {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    let day: string | number = date.getDate()

    if (day < 10) {
      day = '0' + day
    }

    return `${month[date.getMonth()]} ${day},${date.getFullYear()}`
  }
}
