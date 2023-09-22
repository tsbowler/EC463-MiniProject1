import { auth } from '../firebase'; // Import your Firebase authentication instance

function GoogleSignoutButton() {
  const signOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
      // You can now redirect the user to the login page or any other page as needed
      // For example, you can use window.location.href to redirect:
      window.location.href = '/'; // Replace with the URL of your login page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={signOut}>
      Sign Out
    </button>
  );
}

export default GoogleSignoutButton;