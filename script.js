
let users = {
  alice: { password: "1234", points: 100 },
  bob: { password: "abcd", points: 80 }
};

let currentUser = "alice"; // Simulate user login for demo

function buy(item, cost) {
  const password = prompt("Enter your password:");

  if (password !== users[currentUser].password) {
    alert("Incorrect password.");
    return;
  }

  if (users[currentUser].points < cost) {
    alert("Not enough points.");
    return;
  }

  users[currentUser].points -= cost;
  alert(`Purchased ${item} for ${cost} points.`);

  const updatedJSON = JSON.stringify(users, null, 2);
  const base64 = btoa(unescape(encodeURIComponent(updatedJSON)));

  fetch("https://api.github.com/repos/homekit-0/panel/actions/workflows/update-users.yml/dispatches", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_GITHUB_PAT",
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: "main",
      inputs: {
        data: base64
      }
    })
  })
  .then(res => {
    if (res.ok) {
      alert("User data updated successfully.");
    } else {
      alert("Failed to update users.json.");
    }
  });
}
