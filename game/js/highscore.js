// Autocomplete list
$(document).ready(function(){
    var url = '/highscorePower';

    console.log('Check');

    // Accesses our stock database and fills the dropdown
    var success = function(res){
        var data = res;
        console.log(data, 'got a response')
        console.log(data.powerStats.length);
        console.log(data.powerStats[0].power)


        for (var i = 0; i < data.powerStats.length; i++) {
            var username = data.powerStats[i].username;
            var coins = data.powerStats[i].coins;
            var powerLv = data.powerStats[i].power;
            var powerExp = data.powerStats[i].powerexp;
            var defenseLv = data.powerStats[i].defense;
            var defenseExp = data.powerStats[i].defenseexp;
            var healthLv = data.powerStats[i].maxhealth;
            var healthExp = data.powerStats[i].healthexp;

            powerExp = powerExp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            defenseExp = defenseExp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            healthExp = healthExp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            $('#powerHighScore').append('<tr> <td>' + (i + 1) + '</td> <td>' + username + '</td><td class="powerLv">' + powerLv + '</td><td class="powerLv">' + powerExp + '</td><td class="defenseLv">' + defenseLv + '</td><td class="defenseLv">' + defenseExp + '</td><td class="healthLv">' + healthLv + '</td><td class="healthLv">' + healthExp + '</td><br/><br/><br/></tr>');

        }
    }
    $.ajax({
        type: 'POST',
        url: url,
        success: success,
        dataType: 'json'
    });


})