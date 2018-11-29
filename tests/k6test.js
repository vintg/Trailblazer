import http from "k6/http";

export let options = {
  duration: "300s",
  vus:100
};

export default function() {
  for (let i =1;i<=100; i++){
    let id = Math.ceil(Math.random()*Math.pow(10,7));
    http.get(http.url`http://localhost:3000/product/${id}`);
  }
};