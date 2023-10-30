const calculatorForm = document.getElementById('calculator-form');

var initial;
var contribution;
var cont_frequency;
var rate;
var rate_frequency;
var period;
var duration;
var percentage;

var table = document.getElementById("results-table");
var export_button = document.getElementById("export");

calculatorForm.addEventListener("submit", (event) => {
	event.preventDefault();

	initial = document.getElementById("deposit").value;
	contribution = document.getElementById("contribution").value;
	cont_frequency = document.querySelector('input[name="contribution-frequency"]:checked').value;
	rate = document.getElementById("interest").value;
	rate_frequency = document.getElementById("interest-dropdown").value;
	period = document.getElementById("duration").value;
	duration = document.getElementById("duration-dropdown").value;

	if (rate_frequency == "monthly")
		percentage = parseFloat(rate) * 0.01;
	else
		percentage = (parseFloat(rate) / 12) * 0.01;

	if (duration == "months") {
		parseFloat(period);
		calculate();
	} else if (duration == "years") {
		parseFloat(period);
		period *= 12;
		calculate();
	}
});

function calculate() {
	var balance = parseFloat(initial);
	var accrued_interest = 0.0;
	var interest = 0.0;
	var table_body = document.getElementById("table-body");

	if (table_body.rows.length >= 1) {
		let row_count = table_body.rows.length;
		for (let i = 0; i < row_count; i++) {
			table_body.deleteRow(0);
		}
	}

	for (let i = 1; i - 1 < period; i++) {
		if (cont_frequency == "monthly" && balance != initial) {
			balance += parseFloat(contribution);
		}

		interest = balance * percentage;
		balance += interest;
		accrued_interest += interest;

		if (cont_frequency == "annually" && i % 12 == 0) {
			balance += parseFloat(contribution);
		}

		let row = document.createElement("tr");

		let month_row = document.createElement("td");
		let interest_row = document.createElement("td");
		let accrued_interest_row = document.createElement("td");
		let balance_row = document.createElement("td");

		month_row.innerHTML = i;
		interest_row.innerHTML = "$" + interest.toFixed(2);
		accrued_interest_row.innerHTML = "$" + accrued_interest.toFixed(2);
		balance_row.innerHTML = "$" + balance.toFixed(2);

		row.appendChild(month_row);
		row.appendChild(interest_row);
		row.appendChild(accrued_interest_row);
		row.appendChild(balance_row);

		table_body.appendChild(row);
	}

	export_button.style.display = "block";
	export_button.style.animation = "fadeIn 1s"
	table.style.display = "table";
	table.style.animation = "fadeIn 1s"
}

function exportData(file_extension, file_name) {
	var wb = XLSX.utils.table_to_book(table, {
		sheet: "sheet1"
	});
	return XLSX.writeFile(wb, file_name + "." + file_extension);
}