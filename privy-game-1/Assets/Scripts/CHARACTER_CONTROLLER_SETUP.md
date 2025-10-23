# 2D Top-Down Character Controller Setup Guide

## Overview

The `TopDownCharacterController` script provides smooth 2D top-down movement using Rigidbody2D physics. It integrates with Unity's Input System and includes features like acceleration, deceleration, sprinting, and animation support.

## Features

- **Smooth Movement**: Uses Rigidbody2D with acceleration/deceleration for natural-feeling movement
- **Sprint Support**: Hold Left Shift or Left Stick Press to sprint
- **Animation Integration**: Built-in support for Animator parameters
- **Debug Visualization**: Optional gizmos for movement debugging
- **Input System Integration**: Works with the existing InputSystem_Actions setup

## Setup Instructions

### 1. Create a Character GameObject

1. Create an empty GameObject in your scene
2. Name it "Player" or "Character"
3. Add a SpriteRenderer component
4. Assign a sprite to represent your character

### 2. Add Required Components

1. **Rigidbody2D**: The script will automatically add this
2. **TopDownCharacterController**: Add the script component
3. **Collider2D** (optional): Add a CircleCollider2D or BoxCollider2D for collision detection

### 3. Configure the Character Controller

Set the following parameters in the inspector:

#### Movement Settings

- **Move Speed**: Base movement speed (default: 5)
- **Acceleration**: How quickly the character accelerates (default: 10)
- **Deceleration**: How quickly the character stops (default: 10)
- **Max Speed**: Maximum velocity cap (default: 8)

#### Sprint Settings

- **Sprint Multiplier**: Speed multiplier when sprinting (default: 1.5)
- **Can Sprint**: Enable/disable sprinting (default: true)

#### Animation Settings (Optional)

- **Animator**: Reference to your character's Animator component
- **Move Speed Parameter**: Animator float parameter name for speed
- **Is Moving Parameter**: Animator bool parameter name for movement state

### 4. Input Configuration

The controller uses the existing Input System setup:

- **WASD** or **Arrow Keys**: Movement
- **Left Shift** or **Left Stick Press**: Sprint
- **Gamepad Left Stick**: Movement
- **Gamepad Right Stick**: Look (for future features)

### 5. Animation Setup (Optional)

If you want to add animations:

1. Create an Animator Controller
2. Add the following parameters:
   - `MoveSpeed` (Float): Current movement speed
   - `IsMoving` (Bool): Whether the character is moving
3. Create animation states and transitions based on these parameters

### 6. Testing

1. Press Play in the Unity Editor
2. Use WASD or arrow keys to move
3. Hold Left Shift to sprint
4. Enable "Show Debug Info" to see movement data in the console

## Script API

### Public Properties

- `CurrentSpeed`: Current movement speed
- `IsMoving`: Whether the character is currently moving
- `IsSprinting`: Whether the character is currently sprinting

### Public Methods

- `SetMoveSpeed(float)`: Change the base movement speed
- `SetSprintEnabled(bool)`: Enable/disable sprinting
- `StopMovement()`: Immediately stop all movement
- `AddForce(Vector2)`: Apply additional force to the rigidbody
- `SetVelocity(Vector2)`: Set the rigidbody velocity directly

## Troubleshooting

### Character Not Moving

- Check that the Input System Actions asset is assigned in Project Settings
- Ensure the Player input action map is enabled
- Verify the Rigidbody2D has gravity scale set to 0

### Movement Feels Sluggish

- Increase the Acceleration value
- Check that Max Speed is appropriate for your game scale
- Ensure the character sprite scale matches your intended movement speed

### Sprint Not Working

- Verify that "Can Sprint" is enabled
- Check that the Sprint input is properly bound in the Input Actions
- Ensure Sprint Multiplier is greater than 1.0

## Example Usage

```csharp
// Get reference to the controller
TopDownCharacterController controller = GetComponent<TopDownCharacterController>();

// Change movement speed
controller.SetMoveSpeed(7f);

// Disable sprinting
controller.SetSprintEnabled(false);

// Stop movement immediately
controller.StopMovement();
```

## Performance Notes

- The script uses FixedUpdate for physics calculations
- Input is handled in Update for responsiveness
- Animation updates occur in Update to stay in sync with input
- Debug gizmos are only drawn when "Show Debug Info" is enabled
