import { Quiz } from '../types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'Web Development Basics',
    description: 'Test your knowledge of fundamental web development concepts.',
    difficulty: 'easy',
    category: 'Programming',
    timePerQuestion: 30,
    image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    questions: [
      {
        id: 1,
        text: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Multi Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages.'
      },
      {
        id: 2,
        text: 'Which of the following is used to add styles to a webpage?',
        options: [
          'JavaScript',
          'CSS',
          'Python',
          'Java'
        ],
        correctAnswer: 1,
        explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages.'
      },
      {
        id: 3,
        text: 'Which of these is NOT a JavaScript framework or library?',
        options: [
          'React',
          'Angular',
          'Django',
          'Vue'
        ],
        correctAnswer: 2,
        explanation: 'Django is a high-level Python web framework, not a JavaScript framework or library.'
      },
      {
        id: 4,
        text: 'What is the correct way to comment in JavaScript?',
        options: [
          '<!-- This is a comment -->',
          '// This is a comment',
          '/* This is a comment */',
          'Both B and C'
        ],
        correctAnswer: 3,
        explanation: 'In JavaScript, you can use // for single-line comments and /* */ for multi-line comments.'
      },
      {
        id: 5,
        text: 'What does API stand for?',
        options: [
          'Application Programming Interface',
          'Application Process Integration',
          'Automated Programming Interface',
          'Application Protocol Interface'
        ],
        correctAnswer: 0,
        explanation: 'API stands for Application Programming Interface. It allows different software applications to communicate with each other.'
      }
    ]
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Challenge yourself with core JavaScript concepts and practices.',
    difficulty: 'medium',
    category: 'Programming',
    timePerQuestion: 45,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    questions: [
      {
        id: 1,
        text: 'What is the output of: console.log(typeof [])?',
        options: [
          '"array"',
          '"object"',
          '"undefined"',
          '"string"'
        ],
        correctAnswer: 1,
        explanation: 'In JavaScript, arrays are actually objects, so typeof [] returns "object".'
      },
      {
        id: 2,
        text: 'Which method is used to add elements to the end of an array?',
        options: [
          'push()',
          'pop()',
          'unshift()',
          'shift()'
        ],
        correctAnswer: 0,
        explanation: 'The push() method adds new items to the end of an array.'
      },
      {
        id: 3,
        text: 'What is a closure in JavaScript?',
        options: [
          'A way to secure variables from unauthorized access',
          'A function that has access to variables from its outer function scope',
          'A method to close unused variables',
          'A function without a return statement'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function that has access to variables from its outer (enclosing) function scope, even after the outer function has returned.'
      },
      {
        id: 4,
        text: 'What is the correct way to create a promise in JavaScript?',
        options: [
          'const promise = Promise(resolve, reject) => {}',
          'const promise = new Promise(resolve, reject) => {}',
          'const promise = new Promise((resolve, reject) => {})',
          'const promise = Promise((resolve, reject) => {})'
        ],
        correctAnswer: 2,
        explanation: 'A promise is created using the Promise constructor which takes an executor function with resolve and reject parameters.'
      },
      {
        id: 5,
        text: 'What does the "use strict" directive do in JavaScript?',
        options: [
          'Forces the browser to load the page faster',
          'Enables strict mode, catching common coding mistakes',
          'Makes the code more readable',
          'Prevents the use of async/await'
        ],
        correctAnswer: 1,
        explanation: '"use strict" enables strict mode in JavaScript which helps catch common coding mistakes and "unsafe" actions.'
      }
    ]
  },
  {
    id: 3,
    title: 'React Essentials',
    description: 'Test your knowledge of React fundamentals and best practices.',
    difficulty: 'hard',
    category: 'Programming',
    timePerQuestion: 60,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    questions: [
      {
        id: 1,
        text: 'Which hook would you use to run side effects in a function component?',
        options: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1,
        explanation: 'useEffect is used to perform side effects in function components, similar to componentDidMount, componentDidUpdate, and componentWillUnmount in class components.'
      },
      {
        id: 2,
        text: 'What is the correct way to pass a prop called "name" to a component?',
        options: [
          '<Component {name="John"} />',
          '<Component name="John" />',
          '<Component props={name: "John"} />',
          '<Component props.name="John" />'
        ],
        correctAnswer: 1,
        explanation: 'Props are passed to components using HTML-like attribute syntax: <Component name="John" />'
      },
      {
        id: 3,
        text: 'What is React Context used for?',
        options: [
          'To directly modify the DOM',
          'To optimize performance by skipping renders',
          'To share data between components without prop drilling',
          'To create reusable UI elements'
        ],
        correctAnswer: 2,
        explanation: 'React Context provides a way to pass data through the component tree without having to pass props down manually at every level.'
      },
      {
        id: 4,
        text: 'What is the purpose of keys in React lists?',
        options: [
          'They are required for styling list items',
          'They help React identify which items have changed, are added, or removed',
          'They determine the order of list items',
          'They are used for encrypting sensitive data'
        ],
        correctAnswer: 1,
        explanation: 'Keys help React identify which items have changed, are added, or are removed, which helps in efficient rendering of lists.'
      },
      {
        id: 5,
        text: 'Which is NOT a React Hook?',
        options: [
          'useEffect',
          'useState',
          'useDispatch',
          'useCallback'
        ],
        correctAnswer: 2,
        explanation: 'useDispatch is not a built-in React Hook; it comes from the React-Redux library. The others are built-in React Hooks.'
      }
    ]
  }
];