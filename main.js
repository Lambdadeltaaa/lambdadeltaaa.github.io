submit_button = document.getElementById("submit");
submit_button.addEventListener("click", () => {
    let total_kwh = document.getElementById("total-kwh").value;
    let total_price = document.getElementById("total-price").value;

    let names = document.getElementsByClassName("name");
    let prv_kwh_rooms = document.getElementsByClassName("prv");
    let curr_kwh_rooms = document.getElementsByClassName("curr");

    // calculate current kwh - previous kwh of each room
    let kwh_rooms = Array.from(curr_kwh_rooms).map((curr_value, index) => (+curr_value.value - +prv_kwh_rooms[index].value));

    // calculate common area kwh
    let total_kwh_rooms = kwh_rooms.reduce((accu, curr) => (accu + curr), 0);
    let common_area_kwh = +total_kwh - total_kwh_rooms;

    // calculate kwh used for each person and price
    let kwh_by_persons = kwh_rooms.map((value) => (value + common_area_kwh / 4));
    let price_by_persons = kwh_by_persons.map((value) => (value/total_kwh * total_price));


    // Display results
    let result_section = document.getElementsByClassName("result")[0];
    result_section.hidden = false;

    let display_cmn_area = document.getElementById("cmn-area");
    display_cmn_area.innerHTML = `Common Area Total kWh used: ${common_area_kwh.toFixed(2)}`;

    let result_table = document.getElementById("result-table");
    
    let result_rows = result_table.querySelector("tbody").rows;
    for (let i = 0; i < result_rows.length; i++) {
        result_rows[i].cells[0].textContent = names[i].value;
        result_rows[i].cells[1].textContent = kwh_by_persons[i].toFixed(2);
        result_rows[i].cells[2].textContent = price_by_persons[i].toFixed(2);
    }

    let result_footer = result_table.querySelector("tfoot").rows[0];
    result_footer.cells[1].textContent = `Total: ${total_kwh}`;
    result_footer.cells[2].textContent = `Total: ${total_price}`;
});