using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PolicyManagement.Models.DTOs;
using System.Collections;   
using System.Collections.Generic; 

namespace PolicyManagement.Controller;

[ApiController]
[Route("api/[controller]")]
public class BasicController : ControllerBase
{
    [HttpGet("While")]
    public void While()
    {
        int i = 1;
        while (i <= 5)
        {
            Console.WriteLine("While: " + i);
            i++;
        }
    }

    [HttpGet("DoWhile")]
    public void DoWhile()
    {
        int j = 1;
        do
        {
            Console.WriteLine("DoWhile: " + j);
            j++;
        } while (j <= 0);

    }

    [HttpGet("ForLoop")]
    public void ForLoop()
    {
        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine("ForLoop: " + i);
        }
    }
    [HttpGet("List")]
    public void List()
    {
        var list = new List<string>();
        list.Add("Thara");
        list.Add("Nasib");
        list.Add("Johnson");
        foreach (var item in list)
        {
            Console.WriteLine("List Item: " + item);
        }

    }
    [HttpGet("ForList")]
    public void ForList()
    {
        var list = new List<string>();
        list.Add("Thara");
        list.Add("Nasib");
        list.Add("Johnson");
        for (int i = 0; i < list.Count; i++)
        {
            Console.WriteLine("List Item: " + list[i]);
        }

    }
    [HttpGet("Arraylist")]
    public void Arratlist()
    {

        ArrayList list = new ArrayList();
        list.Add("Thara");
        list.Add(20);
        list.Add(3.33);

        for (int i = 0; i < list.Count; i++)
        {
            Console.WriteLine("List Item: " + list[i]);
        }

    }
    [HttpGet("Dictionary")]
    public void Dictionary()
    {
        var dictionary = new Dictionary<string, string>();
        dictionary.Add("Name1", "Nasib");
        dictionary.Add("Name2", "Johnson");
        dictionary.Add("Name3", "Thara");

        foreach (var item in dictionary)
        {
            Console.WriteLine($"{item.Key},{item.Value}");
        }
    }
    

}

