const xyz = `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              76.31897931793812,
              9.968387804110085
            ],
            [
              76.3190119548777,
              9.968246981771445
            ],
            [
              76.31937562363348,
              9.968341883773626
            ],
            [
              76.31929947086935,
              9.968687816861644
            ],
            [
              76.31912696133114,
              9.968646488597082
            ],
            [
              76.31913473198382,
              9.968559240021925
            ],
            [
              76.3191844644157,
              9.968566893359919
            ],
            [
              76.31920622247029,
              9.968436785818362
            ],
            [
              76.31897931793812,
              9.968387804110085
            ]
          ]
        ]
      },
      "properties": {
        "lineWidth": 3,
        "widthScale": "mtrs",
        "hideFill": false,
        "hideLine": false,
        "name": "Polygon 1",
        "id": "dc5e0a7b-cbfc-4da7-b2be-fd2cb2860820",
        "isHidden": false,
        "area": 1059.4868474243578,
        "perimeter": 0.17142013318555388,
        "fill": "#4287f5",
        "fill-opacity": 0.39,
        "stroke": "#4287f5",
        "stroke-opacity": 1
      },
      "id": "dc5e0a7b-cbfc-4da7-b2be-fd2cb2860820",
      "bbox": [
        76.31897931793812,
        9.968246981771445,
        76.31937562363348,
        9.968687816861644
      ]
    }
  ]
}`;

const new1 = JSON.stringify(xyz);
console.log(new1)
console.log(JSON.parse(new1))
