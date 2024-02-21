function populateEditUserForm() {
    const updateUserForm = document.getElementById('updateUserForm');
    const inputField1 = updateUserForm.querySelector(`[name="firstName"]`);
    const inputField2 = updateUserForm.querySelector(`[name="lastName"]`);
    const inputField3 = updateUserForm.querySelector(`[name="username"]`);
    const inputField5 = updateUserForm.querySelector(`[name="email"]`);
    const inputField6 = updateUserForm.querySelector(`[name="phone"]`);
    const inputField7 = updateUserForm.querySelector(`[name="dob"]`);
    const inputField8 = updateUserForm.querySelector(`[name="address"]`);
    const inputField9 = updateUserForm.querySelector(`[name="postalCode"]`);
    const inputField10 = updateUserForm.querySelector(`[name="city"]`);
    inputField1.value = loggedInUser.firstName;
    inputField2.value = loggedInUser.lastName;
    inputField3.value = loggedInUser.username;
    inputField5.value = loggedInUser.email;
    inputField6.value = loggedInUser.phone;
    inputField7.value = loggedInUser.dateOfBirth;
    inputField8.value = loggedInUser.address.street;
    inputField9.value = loggedInUser.address.postalCode;
    inputField10.value = loggedInUser.address.city;
}