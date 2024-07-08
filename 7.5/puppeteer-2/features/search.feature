Feature: Search a course
    Scenario: First test: Booking a movie ticket
        Given user is on "/client/index.php" page
        When user choose the day
        And user choose the seance
        Then user redirected to the next page
        And user sees chosen seanse "Микки маус"
    
    Scenario:Second test: Selecting a seat and booking
        Given user is on "/client/index.php" page
        When user choose the day
        And user choose the seance
        Then user redirected to the next page 
        When user selects the seat
        And user click on accept button
        Then user redirected to the next page
        And user sees booked seanse "Микки маус"

    Scenario:Third test: Checking seat availability
        Given user is on "/client/index.php" page
        When user choose the day
        And user choose the seance
        Then user redirected to the next page 
        When user selects the booked seat
        And user click on accept button
        Then user can not click on accept button