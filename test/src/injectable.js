console.log('OMG, I should not be visible if mocked');

export const hello = name =>
  name ? `Hello, ${name}!` : 'Hello, World!';
