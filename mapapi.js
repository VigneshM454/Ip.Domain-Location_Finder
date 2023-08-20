let ip1=document.getElementById('ip');
let loc1=document.getElementById('loc');
let time1=document.getElementById('time');
let isp1=document.getElementById('isp');
let arrow=document.getElementById('arrow');
let input=document.getElementById('input');
let map = new L.map('map').setView([34.05223, -118.24368], 13);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  }).addTo(map);
  
var api_key = "at_s5yd2cAt4gUmLWRAoMwcBDI7qCeSq";
let lat2='',lng2='';   
var regex=/^(?=.*[a-zA-Z]).+$/;
function isip(inputString){
  if (regex.test(inputString)) {
    return false;
  }
  else {
    return true;
    //"String contains non-alphabetic characters."
  }
}

arrow.addEventListener('click',()=>{
  let ip=input.value;
  if(ip===''){
    alert('please enter a domain or ip')
  }
  else{ 
    let isp,cont2,reg2,city2,time2,geoname;
    $(function () { 
      if(isip(ip)){
     var a= { apiKey: api_key, ipAddress: ip}
      }
      else{
     var a= {apiKey: api_key, domain:ip}
      }
      $.ajax({
             url: "https://geo.ipify.org/api/v1",           
             data: a,
             //{apiKey: api_key, domain:ip},//ipAddress: ip , domain:dom 
             success: function(data){
                 console.log(data);
                  ip2=data.ip;    
                  isp=data.isp;

                  reg2 = data.location.region;
                 city2 = data.location.city;
                 time2 = data.location.timezone;
                 lat2 = data.location.lat;
                 lng2 = data.location.lng;
                 geoname=data.location.geonameId;
                
                 if(lat2!=''&& lng2!=''){
                  var latf=parseFloat(lat2);
                  var lngf=parseFloat(lng2);

                  map.setView([latf, lngf], 13);
                   console.log(lat2+' '+lng2)  
                  L.marker([latf,lngf]).addTo(map)
                  .bindPopup('A marker!')
                  .openPopup();
               
                }
                
                ip1.innerText=ip2;
                loc1.innerText=city2+','+reg2+' '+geoname;
                time1.innerText='UTC '+time2;
                isp1.innerText=isp;
                
              },
              error: function(xhr, status, error) {
                // Handle error 
                if(xhr.status===0){
                  console.log('please check your internet connection');
                }
                else{
                  ip2=error;
                  console.log('Error:', error);
                  console.log('Status:', status);
                }
              }
          
      });
  });

  }
})
