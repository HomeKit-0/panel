const adminPassword = "Yudi@2025"; // Change this to your password

async function loadUsers() {
  const res = await fetch("users.json");
  const users = await res.json();
  return users;
}

async function loadUserPoints() {
  const username = document.getElementById("storeUser").value.trim();
  const users = await loadUsers();
  if (users[username]) {
    document.getElementById("userPoints").innerText = `Points: ${users[username].points}`;
  } else {
    alert("User not found");
  }
}

function buyItem(cost) {
  alert(`Pretend you bought something for ${cost} points. (This doesn't actually deduct points in static hosting)`);
}

async function authAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === adminPassword) {
    document.getElementById("adminPanel").style.display = "block";
    const users = await loadUsers();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    for (const user in users) {
      const li = document.createElement("li");
      li.innerText = `${user}: ${users[user].points} pts`;
      userList.appendChild(li);
    }
  } else {
    alert("Wrong password");
  }
}
function buy(item, cost) {
    // Check if the user has enough points
    if (users[currentUser].points >= cost) {
        // Deduct points from the user
        users[currentUser].points -= cost;

        // Update the points display
        document.getElementById('points').textContent = users[currentUser].points;

        // Send the updated data to the backend (which triggers GitHub Action)
        fetch('https://your-backend-url.com/update-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                updatedUsers: users // Send the updated users object
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Purchased ${item} for ${cost} points.`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update your points.');
        });
    } else {
        alert('Insufficient points!');
    }
}
