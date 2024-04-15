document.getElementById("submit").addEventListener("click", function () {
  const userInput = document.getElementById("inputYear").value;
  console.log(userInput);

  fetch("https://ergast.com/api/f1/" + userInput + "/1/results.json")
    .then((response) => response.json())
    .then((data) => {
      // display the log of the results of api call
      console.log(data);

      // take the containers
      const container = document.getElementById("results");
      const tableBody = document.getElementById("printDrivers");
      const message = document.getElementById("text");

      // clear the containers
      container.innerHTML = "";
      tableBody.innerHTML = "";

      const text = document.createElement("h2");
      text.textContent = `Displaying drivers in year ${userInput}...`;

      // display number of drivers
      const numDrivers = document.createElement("p");
      numDrivers.textContent = `Number of drivers: ${data.MRData.total}`;

      // display series and season
      const series = document.createElement("p");
      series.textContent = `Series: ${data.MRData.series}`;

      const season = document.createElement("p");
      season.textContent = `Season: ${data.MRData.RaceTable.season}`;

      // append information about the selected year
      container.appendChild(series);
      container.appendChild(season);
      container.appendChild(numDrivers);

      message.appendChild(text);

      // Create table rows for each driver
      data.MRData.RaceTable.Races[0].Results.forEach((driver) => {
        var row = document.createElement("tr");

        // cell for surname
        var famName = document.createElement("td");
        famName.textContent = ` ${driver.Driver.familyName}`;
        row.appendChild(famName);

        //cell for first name
        var firstname = document.createElement("td");
        firstname.textContent = ` ${driver.Driver.givenName}`;
        row.appendChild(firstname);

        // cell for permanent number
        var number = document.createElement("td");
        number.textContent = ` ${driver.number}`;
        row.appendChild(number);

        // cell for nationality
        var nationality = document.createElement("td");
        nationality.textContent = `${driver.Driver.nationality}`;
        row.appendChild(nationality);

        // cell for date of birth
        var dob = document.createElement("td");
        dob.textContent = ` ${driver.Driver.dateOfBirth}`;
        row.appendChild(dob);

        // cell for personal information
        var url = document.createElement("td");
        var link = document.createElement("a");
        link.href = driver.Driver.url;
        link.textContent = "Click here to see details";
        url.appendChild(link);
        row.appendChild(url);

        // Append the row to the table body
        tableBody.appendChild(row);
      });

      // Apply style when the container is displayed
      container.style.backgroundColor = "#35cbb7";
      container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    });
});
