import config from './config';

export default class Data {
  
  // to communicate with API
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // get courses from API
  async getCourses() {
    // calls the api to get courses and stores it in response
    const response = await this.api(`/courses`, 'GET');

    // returns the courses if successful 
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    // otherwise return null
    else if (response.status === 401) {
      return null;
    }
    // if errors, throw error
    else {
      throw new Error();
    }
  }

  // Expects a id value and return a single course object, if match
  async getCourse(id) {
    // get a single courses, passing id
    const response = await this.api(id, 'GET');

    // if successful return the course info
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    // if failed, send null
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // expects a url, course object and credentials object, if successful updates the course and return empty array
  async updateCourses(url, course, credentials){

    // updates credentials 
    const response = await this.api(url, 'PUT', course, true, credentials);
    // if updated returns empty array
    if (response.status === 204) {
      return [];
    }
    // else return error
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  // expects courses and credentials object, and create courses if successful
  async createCourses(course, credentials){

    // calls the create course in api and store the value in response
    const response = await this.api('/courses', 'POST', course, true, credentials);

    // if created, returns empty array
    if (response.status === 201) {
      return [];
    }
    // else return error
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  // expects url, username and password. if successful deletes courses
  async deleteCourses(url, username, password){

    // calls the delete course api and stores response 
    const response = await this.api(url, 'DELETE', null, true, { username, password });

    // if successful return empty array
    if (response.status === 204) {
      return [];
    }

    // if errors, return errors
    else if (response.status === 403) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  // expects userame and password and returns user if successful
  async getUser(username, password) {
    // calls the get user in api and saves the response
    const response = await this.api(`/users`, 'GET', null, true, { username, password });

    // if user found, returns the user
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    // if no user found returns null
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // expects user object and creates user if successful
  async createUser(user) {
    // calls the create user api to create user
    const response = await this.api('/users', 'POST', user);
    // if successful returns array
    if (response.status === 201) {
      return [];
    }
    // else, return errors
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }
}
