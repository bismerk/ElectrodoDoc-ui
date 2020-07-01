@test_case_3.3
@grant_edit_access_for_a_file

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.3'

Feature: Grant edit access for a file
  As an owner or editor of the file, I want to provide rights for
  edition to anotherUser so that this user can operate with this file.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file

  @positive
  Scenario: 1 Edit access by owner
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And User has Editors rights to "TestUpload.txt" "file"
    And Login as new user without UI
    And The user 1 is the owner of the file

  @positive
  Scenario: 2 Edit access by editor
    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And User has Editors rights to "TestUpload.txt" "file"

    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Choose the "View and Update" option from pop-up window
    And Register without UI user3
    And Enter "User3" email to field "#form_in_modal_username"
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then User has Editors rights to "TestUpload.txt" "file"

  @negative
  Scenario: 3 User can not grand access for a file to the user with incorrect email
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Error message "User for sharing not found"

  @negative
  Scenario: 4 User can not grand access for a file to the user if he already has them
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"

    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  @negative
  Scenario: 5 Owner can not grand access for a file to himself
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User1" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  Scenario: 6 Editor can not grand access for a file to himself
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"

    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And User has Editors rights to "TestUpload.txt" "file"
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  @negative
  Scenario: 7 Owner can not grand access for a file to some users
    And Register without UI user3
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2 and User3" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 8 Owner can not grand access for a file if field "email" is empty
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "nothing" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

  @negative
  Scenario: 9 Owner can not grand access for a file if field "email" contain spaces
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "spaces" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 10 Owner can not grand access for a file if field "email" contain username
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "UsernameUser2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 11 Editor can can not to transfer ownership for a file
    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then "Transfer ownership" option from pop-up window is not visible
