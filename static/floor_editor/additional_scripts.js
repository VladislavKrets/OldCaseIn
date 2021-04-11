function validateForm() {
	const form = document.forms["save-floor-form"];
	const floor_number = form['floor_number']
    const json_floor = localStorage.getItem('history')
    localStorage.removeItem('history')
    document.getElementById('json_floor').value = json_floor
    return true
}