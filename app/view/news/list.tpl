<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
  <table>
    <tr>
      <td>ID</td>
      <td>名称</td>
      <td>年龄</td>
    </tr>
    {% for item in list %}
      <tr>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
      </tr>
    {% endfor %}
  </table>
  </body>
</html>