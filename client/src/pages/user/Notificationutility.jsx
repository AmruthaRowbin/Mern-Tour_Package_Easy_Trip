// notificationUtils.js

// Check if the Notification API is supported by the browser
export function isNotificationSupported() {
    return 'Notification' in window;
  }
  
  // Request permission to display notifications
  export async function requestNotificationPermission() {
    if (isNotificationSupported()) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
    return false;
  }
  