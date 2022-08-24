# Valant

This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/getting-started/nx-and-angular)

[Interactive Tutorial](https://nx.dev/angular-tutorial/01-create-application)


# Note to code reviewer

## Project implementation

### Installation
No additional installation/compilation required. 
`ValantDemoApi.*.csproj` and `package.json` should include all required packages.
Please use the commands that project template provides to intall and run applications.

### Frontend side
#### Implementation
Include three routes:
- `/` :  home path, which only displays a short welcome message.
- `/available-mazes`: display available mazes can play and a simple form to upload new maze.
- `/play-maze/{id}`: where clients play a maze. Include maze display and a gamepad.

I replace the provided `stuff` service to my own service `_services/maze.service.`

#### Play a game
1. From any page, click `Available Mazes` on the navbar.
2. Click the `Play` link under a maze preview.
3. Click the move buttons to play.
4. A congratulation message will be displayed once the client succeeds. 
5. After success, one can either click navigation links to go home page/available mazes page, or resets the game by click `Reset Game` button.

#### Upload a maze
1. From any page, click `Available Mazes` on the navbar.
2. Click `Choose File` and choose a valid plain text file.
3. Click `Upload`
4. Wait until new maze displayed.


### Backend side
#### Implementation
Use `Microsoft.EntityFrameworkCore.InMemory` as mock database. 
Test data is added when running in developemnt mode only.

Mocked Maze table schema 
```sql
Maze {
  Id: INTEGER;
  UploadDate: DATETIME;
  GraphString: VARCHAR(MAX);
  StartRow: INTEGER;
  StartCol: INTEGER;
  ExitRow: INTEGER;
  ExitCol: INTEGER;
}
```

Important directories/files:
- `ValantDemoApi.MockData`: include mock data that added into database.
- `ValantDemoApi.Utils`: include common features such as graph string converter and direction definition.
- `ValantDemoApi.ValantMaze`: include the model, repository, and controller of Maze entity.
- `./ApiContext`: the database context that used by this demo.
- `./Setup`: mock data is added here in `Configure()`.

#### API endpoints
Include four API endpoints:
- `GET /Maze/{id}`: get maze by maze id
- `GET /Maze/all`: get all mazes
- `POST /Maze`: add a new maze
- `GET /Maze/NextAvailableMoves`: get all available moves
  

## Maze definition format 
Use plain text and any new line character from `["\r", "\n", "\n\r" ]`. 
The last line doesn't need to be an empty line.

Assumptions: 
- The shape of maze MUST be rectangle.
- MUST contain one and only one start symbol `"S"` and exit symbol `"E"`.
- Any invalid symobl will be replaced to wall, i.e. `"X"`.
- Case-insensitive

Example:
```
XOXXXXXXXX
OOOXOOOOEX
OXOOOXXOOO
XXOXOXOXXO
OOOOOOOXXO
OXXOXXSXXO
OOOOXXXXXX
```
An example file `NewMazeString.example.txt` with the same content is in the project root.

After click Upload, Angular app reads the file and convert to a single string which use `"#"` to idicate end-of-row.
It also looks up the position of `"S"` and `"E"` which will be used to generate POST request body.

Example:
```
XOXXXXXXXX#OOOXOOOOEXOXOOOXXOOO#XXOXOXOXXO#OOOOOOOXXO#OXXOXXSXXO#OOOOXXXXXX#
```

The backend app then stores this string (called `GraphString`) and start/exit point position in database. 
If there is any GET maze request, backend converts `GraphString` to `string[][]` and return to the client as JSON.


## About test
Backend unit test cases cover four HTTP request tests and four controller tests.
When testing HTTP request, the test case for `GET /Maze/all` is configured to be run first. 
The reason is I am not able to isolate test DB context and `POST` request impacts the result.
While testing controllers, it does not have this issue. All test cases use different mocked DB contexts.

For frontend unit test, 
Service functions to make API calls are all covered.
Each component is tested at least being created/rendered, @Intput/@Output functions, and basic view.
Except the component `upload-maze`, 
I was struggling with mocking form control behavior, but fails to trigger file input event and form submit event.
If you run all tests, you might notice one is skipped. That it is.

e2e testing is not implemented.

# Contents below are provided by project template.

## Get started

Run `npm install` to install the UI project dependencies. Grab a cup of coffee or your beverage of choice.
You may also need to run `npm install start-server-and-test` and `npm install cross-env`

As you build new controller endpoints you can auto generate the api http client code for angular using `npm run generate-client:server-app`

## Development server

Run `npm run start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=demo` to generate a new component.

## Build

Run `ng build demo` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

- Run `ng test demo` to execute the unit tests via [Jest](https://jestjs.io).
- Run `nx affected:test` to execute the unit tests affected by a change.
- Run `npm run test:all` to run all unit tests in watch mode. They will re-run automatically as you make changes that affect the tests.
