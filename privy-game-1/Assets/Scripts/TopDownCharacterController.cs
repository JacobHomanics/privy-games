using UnityEngine;

public class TopDownCharacterController : MonoBehaviour
{
    [Header("Movement Settings")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float acceleration = 10f;
    [SerializeField] private float deceleration = 10f;

    [Header("Input Settings")]
    [SerializeField] private bool useWASD = true;
    [SerializeField] private bool useArrowKeys = true;

    [Header("Physics Settings")]
    [SerializeField] private float maxVelocity = 8f;
    [SerializeField] private bool freezeRotation = true;

    [Header("Debug")]
    [SerializeField] private bool showDebugInfo = false;

    // Components
    private Rigidbody2D rb;
    private Vector2 inputVector;
    private Vector2 targetVelocity;

    // Input tracking
    private bool isMoving;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();

        if (rb == null)
        {
            Debug.LogError("TopDownCharacterController requires a Rigidbody2D component!");
            enabled = false;
            return;
        }

        // Configure Rigidbody2D for top-down movement
        rb.gravityScale = 0f; // No gravity for top-down
        rb.linearDamping = 0f; // We'll handle deceleration manually
        rb.angularDamping = 0f;

        if (freezeRotation)
        {
            rb.freezeRotation = true;
        }
    }

    void Update()
    {
        HandleInput();
        CalculateMovement();

        if (showDebugInfo)
        {
            Debug.Log($"Input: {inputVector}, Velocity: {rb.linearVelocity}, Speed: {rb.linearVelocity.magnitude:F2}");
        }
    }

    void FixedUpdate()
    {
        ApplyMovement();
    }

    private void HandleInput()
    {
        inputVector = Vector2.zero;

        // WASD Input
        if (useWASD)
        {
            if (Input.GetKey(KeyCode.W)) inputVector.y += 1f;
            if (Input.GetKey(KeyCode.S)) inputVector.y -= 1f;
            if (Input.GetKey(KeyCode.A)) inputVector.x -= 1f;
            if (Input.GetKey(KeyCode.D)) inputVector.x += 1f;
        }

        // Arrow Keys Input
        if (useArrowKeys)
        {
            if (Input.GetKey(KeyCode.UpArrow)) inputVector.y += 1f;
            if (Input.GetKey(KeyCode.DownArrow)) inputVector.y -= 1f;
            if (Input.GetKey(KeyCode.LeftArrow)) inputVector.x -= 1f;
            if (Input.GetKey(KeyCode.RightArrow)) inputVector.x += 1f;
        }

        // Normalize diagonal movement
        if (inputVector.magnitude > 1f)
        {
            inputVector = inputVector.normalized;
        }

        // Update movement state
        isMoving = inputVector.magnitude > 0.1f;
    }

    private void CalculateMovement()
    {
        if (isMoving)
        {
            // Calculate target velocity based on input
            targetVelocity = inputVector * moveSpeed;
        }
        else
        {
            // Gradually decelerate when not moving
            targetVelocity = Vector2.zero;
        }
    }

    private void ApplyMovement()
    {
        Vector2 currentVelocity = rb.linearVelocity;
        Vector2 velocityDifference = targetVelocity - currentVelocity;

        // Apply acceleration or deceleration
        float accelerationRate = isMoving ? acceleration : deceleration;
        Vector2 force = velocityDifference * accelerationRate;

        // Apply the force
        rb.AddForce(force, ForceMode2D.Force);

        // Clamp velocity to max speed
        if (rb.linearVelocity.magnitude > maxVelocity)
        {
            rb.linearVelocity = rb.linearVelocity.normalized * maxVelocity;
        }
    }

    // Public methods for external control
    public void SetMoveSpeed(float speed)
    {
        moveSpeed = Mathf.Max(0f, speed);
    }

    public void SetAcceleration(float accel)
    {
        acceleration = Mathf.Max(0f, accel);
    }

    public void SetDeceleration(float decel)
    {
        deceleration = Mathf.Max(0f, decel);
    }

    public Vector2 GetInputVector()
    {
        return inputVector;
    }

    public Vector2 GetVelocity()
    {
        return rb.linearVelocity;
    }

    public bool IsMoving()
    {
        return isMoving;
    }

    public float GetCurrentSpeed()
    {
        return rb.linearVelocity.magnitude;
    }

    // Method to stop the character immediately
    public void StopMovement()
    {
        rb.linearVelocity = Vector2.zero;
        targetVelocity = Vector2.zero;
    }

    // Method to add impulse force (useful for knockbacks, jumps, etc.)
    public void AddImpulse(Vector2 impulse)
    {
        rb.AddForce(impulse, ForceMode2D.Impulse);
    }

    // Method to set velocity directly (useful for teleportation or instant movement)
    public void SetVelocity(Vector2 velocity)
    {
        rb.linearVelocity = velocity;
        targetVelocity = velocity;
    }

    void OnDrawGizmos()
    {
        if (showDebugInfo && Application.isPlaying)
        {
            // Draw movement direction
            Gizmos.color = Color.green;
            Gizmos.DrawRay(transform.position, inputVector * 2f);

            // Draw velocity
            Gizmos.color = Color.red;
            Gizmos.DrawRay(transform.position, rb.linearVelocity.normalized * 2f);

            // Draw target velocity
            Gizmos.color = Color.blue;
            Gizmos.DrawRay(transform.position, targetVelocity.normalized * 2f);
        }
    }
}
