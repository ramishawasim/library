
// new Glide('.glide', {
//   type: 'carousel',
//   perView: 1,
//   autoplay: 3000
// }).mount();

// chartjs
const ctx = document.getElementById('myDoughnutChart');

// plugin: draw labels on each slice
const sliceLabels = {
  id: 'sliceLabels',
  afterDatasetDraw(chart, args, pluginOptions) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    meta.data.forEach((arc, i) => {
      const { x, y } = arc.tooltipPosition();
      const label = chart.data.labels[i];

      ctx.fillStyle = '#ffffff'; // ← white text
      ctx.fillText(label, x, y);
    });

    ctx.restore();
  }
};

// chartjs
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Plan', 'Travel', 'Relax'],
    datasets: [
      {
        data: [25, 25, 80],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56']
      }
    ]
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    cutout: '50%'
  },
  plugins: [sliceLabels]
});

// leafletjs
var map = L.map('map').fitWorld();


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);



map.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Would you like to go " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

map.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);