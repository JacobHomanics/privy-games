using JacobHomanics.Core.SuperchargedVector2;
using UnityEngine;
using UnityEngine.Events;

public class MouseController : MonoBehaviour
{
    public UnityEvent mouseButtonDown;

    public Timer timer;


    void Update()
    {
        if (Input.GetMouseButtonDown(0) && timer.GetTimeLeft() <= 0)
        {
            mouseButtonDown?.Invoke();
        }
    }
}