let auth0 = null;

// function to download values from auth_config.json
const fetchAuthConfig = () => fetch("/auth_config.json");

// function to download configuration file and initialize auth0
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

// handler to make the configuration call
window.onload = async () => {
  await configureClient();
}
