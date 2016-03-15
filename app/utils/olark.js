const Request = require('superagent');
var messageNumber = 0;
var olarkMessage;
var registermessageNumber = true;
var count;
var counter;
var operatorHasReplied = false;
var visitorAnswers = [];
var expertData = {};
var elem = {};
var expert = '';

function getExpert() {
  return expert;
};

var messageEvent = new Event('newMessageFromOperator');

document.addEventListener('newMessageFromOperator', function (e) {
  console.log('newMessageFromOperator triggered');
}, false);


document.dispatchEvent(messageEvent);

//dispatchEvent(evt);



function startCountDown(seconds, message, callback) {
  clearInterval(counter);
  count = seconds;
  counter = setInterval(timer, 1000);
    function timer() {
      count=count-1;
      if (count <= 0)
      {
         clearInterval(counter);
         callback(message);
         return;
      }
  }
  return counter;
}

function getExpertData(name){
  messageEvent.name = name;
  document.dispatchEvent(messageEvent);
}

function scrollMagic() {
   setTimeout(function(){
      var objDiv = document.getElementById("habla_middle_wrapper_div");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, 50);
}

function answerVisitor(messageObject) {
  if (!operatorHasReplied) {
    messageNumber += 1;
    olark('api.chat.sendMessageToVisitor', messageObject);
  }
}

function notifyVisitor(messageObject) {
  if (!operatorHasReplied) {
    messageNumber += 1;
    olark('api.chat.sendNotificationToVisitor', messageObject);
  }
}

function answerVisitorThenSearch(messageObject) {
  messageNumber += 1;
  olark('api.chat.sendMessageToVisitor', messageObject);
  searchForExperts();
  setTimeout(function(){
    if (!operatorHasReplied) {
        var foundUsMessage = {
              body: "while I'm looking, we'd love if you'd tell us how you found BugRex :)",
              nickname: 'Andy'
          }
        olark('api.chat.sendMessageToVisitor', foundUsMessage);
    }
  }, 5000);
}

function saveMessageFromVisitor(index, question, answer){
  visitorAnswers.push(answer);
}

function searchForExperts(){
  var sorryMessage = {
                body: "I'm really sorry, I couldn't find an experts to help you. Please try again another time.",
                nickname: 'Andy'
            }
  startCountDown(120, sorryMessage, answerVisitor);
  olark('api.chat.sendNotificationToOperator',
    {
        body: 'SURVEY COMPLETED! This chat is up for grabs the next two minutes!'

    });
}
olark('api.chat.onReady', function (){  
  console.log('-----olark ready');
 
/*  var emailForm = document.getElementById('habla_pre_chat_email_input');

  emailForm.addEventListener('keydown', function(event){
    setTimeout(function(){
      if (event.which === 13 && document.getElementById('habla_pre_chat_email_input').offsetParent === null) {
        if (!operatorHasReplied) {
        var greet = "hey, I'll ask you a few questions, so we can get find an expert who knows how to help you. Ok?";
            olarkMessage = {
                body: greet,
                nickname: 'Rex'
            }
            startCountDown(0, olarkMessage, answerVisitor);
        }
      }
    },500);
  });*/
});

olark('api.chat.onMessageToVisitor', function(event){
  console.log('----------onMessageToVisitor');
  expert = event.message.nickname;
  getExpertData(event.message.nickname);
  scrollMagic();
  if (event.message.automated === false) {
    operatorHasReplied = true;
  }
});

olark('api.chat.onOperatorsAvailable', function() {
 /* console.log('onOperatorsAvailable')
  var liveBadge = document.createElement('div');
  var text = document.createTextNode("Experts are live"); 
  liveBadge.appendChild(text);
  var chatTitle = document.getElementById("left");
  document.body.insertBefore(liveBadge, chatTitle); */
    // turn something green
    // document.getElementById("chat-indicator").className = "live";

/*
hacky style for 'live button'
    position: absolute;
    top: 20px;
    left: 63%;
    display: inline;
    height: 10px;
    width: 10px;
    background-color: green;
    border-radius: 100%;

*/
});

function isEmail(text) {
  alphaSplit = text.split('@');
  if (alphaSplit.length === 2) {
    var afterAlpha = alphaSplit[1].split('.');
    if (afterAlpha.length >= 2) {
      return true;
    }
  }
  return false;
}

olark('api.chat.onOperatorsAway', function() {
    // make something red
    // document.getElementById("chat-indicator").className = "no-live";
});

olark('api.chat.onMessageToOperator', function(event) {
    scrollMagic();
      if (!operatorHasReplied) {
        if (messageNumber === 0) {
            //saveMessageFromVisitor(olarkMessage.body, event.message.body);
            olarkMessage = {
                body: "cool. how can we help you?",
                nickname: 'Andy'
            }
            startCountDown(4, olarkMessage, answerVisitor);
        }

        else if (messageNumber === 1) {
            saveMessageFromVisitor(olarkMessage.body, event.message.body);
            olarkMessage = {
                body: "which technologies are involved in the problem?",
                nickname: 'Andy'
            }
            startCountDown(5, olarkMessage, answerVisitor);
        }

        else if (messageNumber === 2) {
            saveMessageFromVisitor(olarkMessage.body, event.message.body);
            olarkMessage = {
                body: "awesome, to continue I'm gonna need your email case we get disconnected",
                nickname: 'Andy'
            }
            startCountDown(5, olarkMessage, answerVisitor);
        }

         else if (messageNumber === 3) {
          var emailVerif = isEmail(event.message.body);
            if (emailVerif === true) {
                olarkMessage = {
                    body: "thanks mate, I'm searching for an expert. it can take up to two minutes, so hold tight...",
                    nickname: 'Andy'
                }
                startCountDown(5, olarkMessage, answerVisitorThenSearch);
            } else {
              console.log('no email');
              
              setTimeout(function(){
                olarkMessage = {
                    body: "that doesn't look like an email address to me ;)",
                    nickname: 'Andy'
                };
                olark('api.chat.sendMessageToVisitor', olarkMessage);
              }, 1000);
            }
        }
      }
});

setInterval(function(){
  var composing = document.getElementsByClassName('olark-composing-message');
  if (composing.length > 0){
    var objDiv = document.getElementById("habla_middle_wrapper_div");
      objDiv.scrollTop = objDiv.scrollHeight;
  }
}, 1000);

module.exports = {
  expertData: expertData,
  event: event,
  getExpert: getExpert
};

