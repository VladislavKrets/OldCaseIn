function validateForm() {
	const form = document.forms["save-floor-form"];
	const floor_number = form['floor_number']
    const json_floor = JSON.parse(localStorage.getItem('history'))
    const current = json_floor[json_floor.length - 1]
    localStorage.removeItem('history')
    document.getElementById('json_floor').value = JSON.stringify(current)
    return true
}