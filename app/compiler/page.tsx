"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Code, Trophy, ArrowRight, Play, Terminal, Zap, Eye, RotateCcw } from "lucide-react"

const PROGRAMMING_LANGUAGES = [
  { id: "javascript", name: "JavaScript", color: "bg-yellow-500", icon: "🟨" },
  { id: "python", name: "Python", color: "bg-blue-500", icon: "🐍" },
  { id: "java", name: "Java", color: "bg-red-500", icon: "☕" },
  { id: "cpp", name: "C++", color: "bg-purple-500", icon: "⚡" },
  { id: "react", name: "React", color: "bg-cyan-500", icon: "⚛️" },
  { id: "typescript", name: "TypeScript", color: "bg-blue-600", icon: "📘" },
]

const CODING_CHALLENGES = {
  javascript: [
    {
      challenge: "Create a function that returns the sum of two numbers",
      description: "Write a function called 'add' that takes two parameters and returns their sum.",
      expectedOutput: "add(2, 3) should return 5",
      solution: "function add(a, b) {\n  return a + b;\n}",
      keywords: ["function", "add", "return", "+"],
      requiredPattern: /function\s+add\s*$$[^)]*$$\s*\{[^}]*return[^}]*\+[^}]*\}/i,
    },
    {
      challenge: "Create an array and add an element to it",
      description: "Create an array called 'fruits' with 'apple' and 'banana', then add 'orange' to it.",
      expectedOutput: "Array should contain ['apple', 'banana', 'orange']",
      solution: "let fruits = ['apple', 'banana'];\nfruits.push('orange');",
      keywords: ["fruits", "apple", "banana", "push", "orange"],
      requiredPattern: /fruits.*=.*\[.*apple.*banana.*\].*fruits\.push.*orange/i,
    },
    {
      challenge: "Check if a number is even",
      description: "Write a function 'isEven' that returns true if a number is even, false otherwise.",
      expectedOutput: "isEven(4) should return true, isEven(3) should return false",
      solution: "function isEven(num) {\n  return num % 2 === 0;\n}",
      keywords: ["function", "isEven", "return", "%", "2", "===", "0"],
      requiredPattern: /function\s+isEven\s*$$[^)]*$$\s*\{[^}]*return[^}]*%\s*2[^}]*\}/i,
    },
    {
      challenge: "Create a simple object",
      description: "Create an object called 'person' with properties 'name' and 'age'.",
      expectedOutput: "Object should have name and age properties",
      solution: "let person = {\n  name: 'John',\n  age: 25\n};",
      keywords: ["person", "name", "age", "{", "}"],
      requiredPattern: /person\s*=\s*\{[^}]*name[^}]*age[^}]*\}/i,
    },
    {
      challenge: "Loop through an array",
      description: "Create a for loop that prints each element in the array [1, 2, 3, 4, 5].",
      expectedOutput: "Should print each number",
      solution: "let arr = [1, 2, 3, 4, 5];\nfor(let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}",
      keywords: ["for", "arr", "length", "console.log"],
      requiredPattern: /for\s*$$[^)]*i[^)]*arr\.length[^)]*$$[^}]*console\.log/i,
    },
  ],
  python: [
    {
      challenge: "Create a function that returns the sum of two numbers",
      description: "Write a function called 'add' that takes two parameters and returns their sum.",
      expectedOutput: "add(2, 3) should return 5",
      solution: "def add(a, b):\n    return a + b",
      keywords: ["def", "add", "return", "+"],
      requiredPattern: /def\s+add\s*$$[^)]*$$\s*:[^:]*return[^:]*\+/i,
    },
    {
      challenge: "Create a list and add an element",
      description: "Create a list called 'fruits' with 'apple' and 'banana', then add 'orange'.",
      expectedOutput: "List should contain ['apple', 'banana', 'orange']",
      solution: "fruits = ['apple', 'banana']\nfruits.append('orange')",
      keywords: ["fruits", "apple", "banana", "append", "orange"],
      requiredPattern: /fruits.*=.*\[.*apple.*banana.*\].*fruits\.append.*orange/i,
    },
    {
      challenge: "Check if a number is even",
      description: "Write a function 'is_even' that returns True if a number is even.",
      expectedOutput: "is_even(4) should return True",
      solution: "def is_even(num):\n    return num % 2 == 0",
      keywords: ["def", "is_even", "return", "%", "2", "==", "0"],
      requiredPattern: /def\s+is_even\s*$$[^)]*$$\s*:[^:]*return[^:]*%\s*2[^:]*==/i,
    },
    {
      challenge: "Create a dictionary",
      description: "Create a dictionary called 'student' with keys 'name' and 'grade'.",
      expectedOutput: "Dictionary should have name and grade keys",
      solution: "student = {\n    'name': 'Alice',\n    'grade': 'A'\n}",
      keywords: ["student", "name", "grade", "{", "}"],
      requiredPattern: /student\s*=\s*\{[^}]*name[^}]*grade[^}]*\}/i,
    },
    {
      challenge: "Loop through a list",
      description: "Create a for loop that prints each number in the list [1, 2, 3, 4, 5].",
      expectedOutput: "Should print each number",
      solution: "numbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    print(num)",
      keywords: ["for", "in", "print", "numbers"],
      requiredPattern: /for\s+\w+\s+in\s+\w+.*print/i,
    },
    {
      challenge: "Create a class",
      description: "Create a class called 'Car' with an __init__ method that takes 'brand' parameter.",
      expectedOutput: "Class should have constructor with brand parameter",
      solution: "class Car:\n    def __init__(self, brand):\n        self.brand = brand",
      keywords: ["class", "Car", "__init__", "self", "brand"],
      requiredPattern: /class\s+Car.*def\s+__init__.*self.*brand/i,
    },
    {
      challenge: "Handle exceptions",
      description: "Write a try-except block that handles a division by zero error.",
      expectedOutput: "Should catch ZeroDivisionError",
      solution: "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
      keywords: ["try", "except", "ZeroDivisionError"],
      requiredPattern: /try\s*:[^:]*except\s+ZeroDivisionError/i,
    },
    {
      challenge: "List comprehension",
      description: "Create a list comprehension that generates squares of numbers from 1 to 5.",
      expectedOutput: "Should create [1, 4, 9, 16, 25]",
      solution: "squares = [x**2 for x in range(1, 6)]",
      keywords: ["for", "in", "range", "**"],
      requiredPattern: /\[.*\*\*.*for.*in.*range/i,
    },
    {
      challenge: "Import and use a module",
      description: "Import the math module and use it to calculate the square root of 16.",
      expectedOutput: "Should import math and use math.sqrt()",
      solution: "import math\nresult = math.sqrt(16)",
      keywords: ["import", "math", "sqrt"],
      requiredPattern: /import\s+math.*math\.sqrt/i,
    },
    {
      challenge: "Define a lambda function",
      description: "Create a lambda function that multiplies a number by 2.",
      expectedOutput: "Lambda function should double the input",
      solution: "double = lambda x: x * 2",
      keywords: ["lambda", "*", "2"],
      requiredPattern: /lambda\s+\w+\s*:\s*\w+\s*\*\s*2/i,
    },
  ],
  java: [
    {
      challenge: "Create a simple class with main method",
      description: "Create a class called 'HelloWorld' with a main method that prints 'Hello, World!'.",
      expectedOutput: "Should print Hello, World!",
      solution:
        'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      keywords: ["public", "class", "HelloWorld", "main", "System.out.println"],
      requiredPattern: /public\s+class\s+HelloWorld.*public\s+static\s+void\s+main.*System\.out\.println/i,
    },
    {
      challenge: "Declare and initialize variables",
      description: "Declare an integer variable 'age' and assign it the value 25.",
      expectedOutput: "Should declare int age = 25;",
      solution: "int age = 25;",
      keywords: ["int", "age", "=", "25"],
      requiredPattern: /int\s+age\s*=\s*25/i,
    },
    {
      challenge: "Create a method",
      description: "Create a method called 'add' that takes two integers and returns their sum.",
      expectedOutput: "Method should return sum of two integers",
      solution: "public static int add(int a, int b) {\n    return a + b;\n}",
      keywords: ["public", "static", "int", "add", "return"],
      requiredPattern: /public\s+static\s+int\s+add\s*$$[^)]*int[^)]*int[^)]*$$[^}]*return[^}]*\+/i,
    },
    {
      challenge: "Create an array",
      description: "Create an integer array called 'numbers' with values 1, 2, 3, 4, 5.",
      expectedOutput: "Should create int array with 5 elements",
      solution: "int[] numbers = {1, 2, 3, 4, 5};",
      keywords: ["int[]", "numbers", "{", "1", "2", "3", "4", "5", "}"],
      requiredPattern: /int\[\]\s+numbers\s*=\s*\{.*1.*2.*3.*4.*5.*\}/i,
    },
    {
      challenge: "Create a for loop",
      description: "Create a for loop that prints numbers from 1 to 5.",
      expectedOutput: "Should print numbers 1 through 5",
      solution: "for(int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}",
      keywords: ["for", "int", "i", "<=", "5", "System.out.println"],
      requiredPattern: /for\s*\(\s*int\s+i\s*=\s*1.*i\s*<=\s*5.*i\+\+.*System\.out\.println/i,
    },
  ],
  cpp: [
    {
      challenge: "Create a simple C++ program",
      description: "Write a C++ program that includes iostream and prints 'Hello, World!'.",
      expectedOutput: "Should include iostream and print Hello, World!",
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      keywords: ["#include", "iostream", "using", "namespace", "std", "main", "cout"],
      requiredPattern: /#include\s*<iostream>.*using\s+namespace\s+std.*int\s+main.*cout/i,
    },
    {
      challenge: "Declare variables",
      description: "Declare an integer variable 'num' and assign it the value 42.",
      expectedOutput: "Should declare int num = 42;",
      solution: "int num = 42;",
      keywords: ["int", "num", "=", "42"],
      requiredPattern: /int\s+num\s*=\s*42/i,
    },
    {
      challenge: "Create a function",
      description: "Create a function called 'multiply' that takes two integers and returns their product.",
      expectedOutput: "Function should return product of two integers",
      solution: "int multiply(int a, int b) {\n    return a * b;\n}",
      keywords: ["int", "multiply", "return", "*"],
      requiredPattern: /int\s+multiply\s*$$[^)]*int[^)]*int[^)]*$$[^}]*return[^}]*\*/i,
    },
    {
      challenge: "Create an array",
      description: "Create an integer array called 'arr' with 5 elements.",
      expectedOutput: "Should create int arr[5];",
      solution: "int arr[5];",
      keywords: ["int", "arr", "[", "5", "]"],
      requiredPattern: /int\s+arr\s*\[\s*5\s*\]/i,
    },
    {
      challenge: "Create a while loop",
      description: "Create a while loop that prints numbers from 1 to 3.",
      expectedOutput: "Should use while loop with counter",
      solution: "int i = 1;\nwhile(i <= 3) {\n    cout << i << endl;\n    i++;\n}",
      keywords: ["while", "i", "<=", "3", "cout", "i++"],
      requiredPattern: /while\s*$$[^)]*<=\s*3[^)]*$$[^}]*cout[^}]*i\+\+/i,
    },
  ],
  react: [
    {
      challenge: "Create a functional component",
      description: "Create a React functional component called 'Welcome' that returns a div with 'Hello, React!'.",
      expectedOutput: "Should export a functional component",
      solution: "function Welcome() {\n  return <div>Hello, React!</div>;\n}\n\nexport default Welcome;",
      keywords: ["function", "Welcome", "return", "div", "export", "default"],
      requiredPattern: /function\s+Welcome\s*$$[^)]*$$\s*\{[^}]*return[^}]*<div>[^}]*export\s+default\s+Welcome/i,
    },
    {
      challenge: "Use useState hook",
      description: "Import useState and create a state variable 'count' with initial value 0.",
      expectedOutput: "Should use useState hook",
      solution:
        "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <div>{count}</div>;\n}",
      keywords: ["import", "useState", "const", "count", "setCount", "0"],
      requiredPattern: /import.*useState.*const\s*\[\s*count\s*,\s*setCount\s*\]\s*=\s*useState\s*$$\s*0\s*$$/i,
    },
    {
      challenge: "Handle click events",
      description: "Create a button that increments a counter when clicked.",
      expectedOutput: "Should have onClick handler",
      solution:
        "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}",
      keywords: ["button", "onClick", "setCount", "count", "+", "1"],
      requiredPattern: /button.*onClick.*setCount.*count\s*\+\s*1/i,
    },
    {
      challenge: "Create JSX with props",
      description: "Create a component that accepts a 'name' prop and displays it.",
      expectedOutput: "Should use props in JSX",
      solution: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}",
      keywords: ["function", "Greeting", "name", "return", "h1", "{name}"],
      requiredPattern: /function\s+Greeting\s*$$\s*\{\s*name\s*\}\s*$$\s*\{[^}]*return[^}]*<h1>[^}]*\{name\}/i,
    },
    {
      challenge: "Use useEffect hook",
      description: "Import useEffect and use it to log 'Component mounted' when component mounts.",
      expectedOutput: "Should use useEffect with empty dependency array",
      solution:
        "import { useEffect } from 'react';\n\nfunction MyComponent() {\n  useEffect(() => {\n    console.log('Component mounted');\n  }, []);\n  return <div>My Component</div>;\n}",
      keywords: ["import", "useEffect", "console.log", "Component mounted", "[]"],
      requiredPattern: /import.*useEffect.*useEffect\s*\([^)]*console\.log[^)]*\[\s*\]/i,
    },
  ],
  typescript: [
    {
      challenge: "Define a type interface",
      description: "Create an interface 'User' with properties 'name' (string) and 'age' (number).",
      expectedOutput: "Should define interface with typed properties",
      solution: "interface User {\n  name: string;\n  age: number;\n}",
      keywords: ["interface", "User", "name", "string", "age", "number"],
      requiredPattern: /interface\s+User\s*\{[^}]*name\s*:\s*string[^}]*age\s*:\s*number[^}]*\}/i,
    },
    {
      challenge: "Create a typed function",
      description: "Create a function 'greet' that takes a name (string) and returns a greeting (string).",
      expectedOutput: "Should have typed parameters and return type",
      solution: "function greet(name: string): string {\n  return `Hello, ${name}!`;\n}",
      keywords: ["function", "greet", "name", "string", "return"],
      requiredPattern: /function\s+greet\s*$$\s*name\s*:\s*string\s*$$\s*:\s*string[^}]*return/i,
    },
    {
      challenge: "Use generic types",
      description: "Create a generic function 'identity' that returns the same type as its input.",
      expectedOutput: "Should use generic type parameter",
      solution: "function identity<T>(arg: T): T {\n  return arg;\n}",
      keywords: ["function", "identity", "<T>", "arg", "T", "return"],
      requiredPattern: /function\s+identity\s*<\s*T\s*>\s*$$\s*arg\s*:\s*T\s*$$\s*:\s*T[^}]*return/i,
    },
    {
      challenge: "Create a class with typed properties",
      description: "Create a class 'Person' with typed properties 'name' and 'age'.",
      expectedOutput: "Should define class with typed properties",
      solution:
        "class Person {\n  name: string;\n  age: number;\n  \n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n}",
      keywords: ["class", "Person", "name", "string", "age", "number", "constructor"],
      requiredPattern: /class\s+Person\s*\{[^}]*name\s*:\s*string[^}]*age\s*:\s*number[^}]*constructor/i,
    },
    {
      challenge: "Use union types",
      description: "Create a variable that can be either a string or number.",
      expectedOutput: "Should use union type syntax",
      solution: "let value: string | number;\nvalue = 'hello';\nvalue = 42;",
      keywords: ["let", "value", "string", "|", "number"],
      requiredPattern: /let\s+value\s*:\s*string\s*\|\s*number/i,
    },
  ],
}

export default function CodeQuest() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentChallenges = selectedLanguage
    ? CODING_CHALLENGES[selectedLanguage as keyof typeof CODING_CHALLENGES]
    : []
  const currentChallenge = currentChallenges[currentQuestionIndex]
  const progress = (completedQuestions.length / currentChallenges.length) * 100

  const verifyCode = (code: string, challenge: any) => {
    const normalizedCode = code.toLowerCase().trim()

    // Check if code contains required keywords
    const hasKeywords = challenge.keywords.every((keyword: string) => normalizedCode.includes(keyword.toLowerCase()))

    // Check if code matches required pattern
    const matchesPattern = challenge.requiredPattern ? challenge.requiredPattern.test(code) : true

    return hasKeywords && matchesPattern
  }

  const handleSubmitCode = () => {
    if (!currentChallenge) return

    const isCodeCorrect = verifyCode(userCode, currentChallenge)

    if (isCodeCorrect) {
      setIsCorrect(true)
      setFeedback("✅ Correct! Great job!")
      if (!completedQuestions.includes(currentQuestionIndex)) {
        setCompletedQuestions([...completedQuestions, currentQuestionIndex])
      }
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setIsCorrect(false)

      if (newAttempts >= 3) {
        setShowAnswer(true)
        setFeedback(`❌ After ${newAttempts} attempts, here's the solution. Study it and try the next challenge!`)
      } else {
        setFeedback(
          `❌ Not quite right (Attempt ${newAttempts}/3). Check your syntax and make sure you're using the required elements.`,
        )
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentChallenges.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserCode("")
      setFeedback("")
      setIsCorrect(false)
      setAttempts(0)
      setShowAnswer(false)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setSelectedLanguage(null)
    setCurrentQuestionIndex(0)
    setUserCode("")
    setFeedback("")
    setIsCorrect(false)
    setCompletedQuestions([])
    setShowResults(false)
    setAttempts(0)
    setShowAnswer(false)
  }

  const retryQuestion = () => {
    setUserCode("")
    setFeedback("")
    setIsCorrect(false)
    setAttempts(0)
    setShowAnswer(false)
  }

  if (showResults) {
    const score = Math.round((completedQuestions.length / currentChallenges.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                Quest Complete!
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                You've finished the {selectedLanguage} coding challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-green-400">{score}%</div>
              <p className="text-slate-300">
                You completed {completedQuestions.length} out of {currentChallenges.length} challenges correctly!
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700">
                  Try Another Language
                </Button>
                <Button
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestionIndex(0)
                    setCompletedQuestions([])
                    setUserCode("")
                    setFeedback("")
                    setIsCorrect(false)
                  }}
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  Retry {selectedLanguage}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Terminal className="w-12 h-12 text-green-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-sans">
                CodeQuest
              </h1>
              <Zap className="w-12 h-12 text-purple-400" />
            </div>
            <p className="text-xl text-slate-300 font-sans">
              Master programming languages through hands-on coding challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMMING_LANGUAGES.map((lang) => (
              <Card
                key={lang.id}
                className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => setSelectedLanguage(lang.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{lang.icon}</div>
                  <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors font-sans">
                    {lang.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {currentChallenges.length || 5} coding challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <Badge className={`${lang.color} text-white px-4 py-2`}>Start Coding</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
          >
            ← Back to Languages
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white font-sans">
              {PROGRAMMING_LANGUAGES.find((l) => l.id === selectedLanguage)?.name} Challenge
            </h1>
            <p className="text-slate-400">
              Question {currentQuestionIndex + 1} of {currentChallenges.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Progress</div>
            <div className="text-lg font-bold text-green-400">{Math.round(progress)}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="mb-8 h-2 bg-slate-700" />

        {/* Challenge Card */}
        <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-green-400" />
              <CardTitle className="text-xl text-white font-sans">{currentChallenge?.challenge}</CardTitle>
              {attempts > 0 && !isCorrect && (
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                  Attempt {attempts}/3
                </Badge>
              )}
            </div>
            <CardDescription className="text-slate-300 text-base">{currentChallenge?.description}</CardDescription>
            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-green-500/20">
              <p className="text-green-400 text-sm font-mono">Expected: {currentChallenge?.expectedOutput}</p>
            </div>
          </CardHeader>
        </Card>

        {/* Solution Display */}
        {showAnswer && (
          <Card className="bg-blue-900/20 border-blue-500/50 backdrop-blur-sm mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-400" />
                <CardTitle className="text-lg text-blue-400 font-sans">Solution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900/80 text-green-400 font-mono text-sm p-4 rounded-lg border border-slate-600 overflow-x-auto">
                {currentChallenge?.solution}
              </pre>
              <p className="text-slate-300 text-sm mt-3">
                Study this solution and understand the pattern. You can retry this question or move to the next one.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Code Editor */}
        <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-slate-400 text-sm font-mono ml-4">
                {selectedLanguage}.{selectedLanguage === "cpp" ? "cpp" : selectedLanguage === "python" ? "py" : "js"}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder={`// Write your ${selectedLanguage} code here...\n// ${currentChallenge?.description}`}
              className="w-full h-64 bg-slate-900/80 text-green-400 font-mono text-sm p-4 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={handleSubmitCode}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            disabled={!userCode.trim()}
          >
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>

          {showAnswer && (
            <Button
              onClick={retryQuestion}
              variant="outline"
              className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-6 py-2 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry Question
            </Button>
          )}

          {(isCorrect || showAnswer) && (
            <Button onClick={handleNextQuestion} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">
              {currentQuestionIndex < currentChallenges.length - 1 ? (
                <>
                  Next Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  View Results
                  <Trophy className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <Card
            className={`border-2 ${
              isCorrect
                ? "border-green-500/50 bg-green-900/20"
                : showAnswer
                  ? "border-blue-500/50 bg-blue-900/20"
                  : "border-red-500/50 bg-red-900/20"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : showAnswer ? (
                  <Eye className="w-6 h-6 text-blue-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-red-400 flex items-center justify-center">
                    <span className="text-red-400 text-sm">✕</span>
                  </div>
                )}
                <p
                  className={`text-lg font-medium ${
                    isCorrect ? "text-green-400" : showAnswer ? "text-blue-400" : "text-red-400"
                  }`}
                >
                  {feedback}
                </p>
              </div>
              {!isCorrect && !showAnswer && (
                <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-purple-500/20">
                  <p className="text-slate-300 text-sm">
                    <strong>Hint:</strong> Make sure your code includes: {currentChallenge?.keywords.join(", ")}
                  </p>
                  <p className="text-yellow-400 text-sm mt-2">
                    {3 - attempts} attempts remaining before solution is revealed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
