// Script to create test users with different roles
// Run this with: node create-test-users.js

const API_BASE_URL = 'http://localhost:4000/api';

async function createTestUsers() {
  console.log('Creating test users...\n');

  // Create admin user
  try {
    const adminResponse = await fetch(`${API_BASE_URL}/auth/create-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'admin123'
      })
    });

    const adminData = await adminResponse.json();
    if (adminResponse.ok) {
      console.log('✅ Admin user created successfully:');
      console.log(`   Email: admin@test.com`);
      console.log(`   Password: admin123`);
      console.log(`   Role: ${adminData.user.role}\n`);
    } else {
      console.log('❌ Failed to create admin user:', adminData.message);
    }
  } catch (error) {
    console.log('❌ Error creating admin user:', error.message);
  }

  // Create moderator user
  try {
    const moderatorResponse = await fetch(`${API_BASE_URL}/auth/create-moderator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Moderator User',
        email: 'moderator@test.com',
        password: 'moderator123'
      })
    });

    const moderatorData = await moderatorResponse.json();
    if (moderatorResponse.ok) {
      console.log('✅ Moderator user created successfully:');
      console.log(`   Email: moderator@test.com`);
      console.log(`   Password: moderator123`);
      console.log(`   Role: ${moderatorData.user.role}\n`);
    } else {
      console.log('❌ Failed to create moderator user:', moderatorData.message);
    }
  } catch (error) {
    console.log('❌ Error creating moderator user:', error.message);
  }

  // Create regular user
  try {
    const userResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Regular User',
        email: 'user@test.com',
        password: 'user123'
      })
    });

    const userData = await userResponse.json();
    if (userResponse.ok) {
      console.log('✅ Regular user created successfully:');
      console.log(`   Email: user@test.com`);
      console.log(`   Password: user123`);
      console.log(`   Role: ${userData.user.role}\n`);
    } else {
      console.log('❌ Failed to create regular user:', userData.message);
    }
  } catch (error) {
    console.log('❌ Error creating regular user:', error.message);
  }

  console.log('🎉 Test users creation completed!');
  console.log('\nYou can now test the role-based access control:');
  console.log('1. Login with admin@test.com to access /admin and /moderator pages');
  console.log('2. Login with moderator@test.com to access /moderator page (but not /admin)');
  console.log('3. Login with user@test.com to see access denied for both /admin and /moderator pages');
}

// Run the script
createTestUsers().catch(console.error);
