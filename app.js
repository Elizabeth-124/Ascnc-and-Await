const searchForm = document.querySelector("#searchForm");
const usernameInput = document.querySelector("#usernameInput");
const searchBtn = document.querySelector("#searchBtn");

const loadingIndicator = document.querySelector("#loadingIndicator");
const errorAlert = document.querySelector("#errorAlert");
const errrorMessage = document.querySelector("#errorMessage");
const profileContainer = document.querySelector("#profileContainer");

const avatarImg = document.querySelector("#avatarImg");
const profileName = document.querySelector("#profileName");
const profileBio = document.querySelector("#profileBio");
const profileHandle = document.querySelector("#profileHandle");

const profileLocation = document.querySelector("#profileLocation");
const profileCompany = document.querySelector("#profileCompany");
const repoCount = document.querySelector("#repoCount");
const followerCount = document.querySelector("#followerCount");
const followingCount = document.querySelector("#followingCount");
const profileLink = document.querySelector("#profileLink");

const fetchGitHubUser = async (username) => {
    const endpoint = `https://api.github.com/users/${username}`;

    loadingIndicator.classList.remove("d-none");
    errorAlert.classList.add("d-none");
    profileContainer.classList.add("d-none");
    searchBtn.disabled = true;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Username "${username}" does not exist on GitHub`);
            } else {
                throw new Error(`Server returned error status: ${response.status}`);
            }
        }

        const userData = await response.json();
        console.log("GitHub User Data:", userData);

        avatarImg.src = userData.avatar_url;
        avatarImg.alt = `${userData.login}'s avatar`;
        profileName.textContent = userData.name || userData.login;
        profileBio.textContent = userData.bio || "No publicbio provided.";
        profileHandle.textContent = `@${userData.login}`;

        profileLocation.textContent = `Location: ${userData.location || "Remote"}`;
        profileCompany.textContent = `Company: ${userData.company || "Not provided"}`;

        repoCount.textContent = userData.public_repos;
        followerCount.textContent = userData.followers;
        followingCount.textContent = userData.following;
        profileLink.href = userData.html_url;

        profileContainer.classList.remove("d-none");
    }catch (err) {
        console.error("Fetch failure:", err.message);
        errrorMessage.textContent = err.message;
        errorAlert.classList.remove("d-none");
    }finally {
        loadingIndicator.classList.add("d-none");
        searchBtn.disabled = false;
    }

}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        fetchGitHubUser(username);
    }
});

