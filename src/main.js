                                                            //NOTE:  ||SHREEKRUSHNA||



//NOTE: main

// import { createClient } from '@supabase/supabase-js';

// (async () => {

// // ✅ Only run if user is inside a Google Meet (not in lobby)
// const meetingUrlPattern = /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
// if (!meetingUrlPattern.test(window.location.pathname)) {
//   console.log('🔕 Not in a meeting — skipping queue UI');
//   return;
// }

// // ✅ Supabase setup
// const supabase = createClient(
//   'https://prkzycoudpeoerecdlfw.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya3p5Y291ZHBlb2VyZWNkbGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjkzMjUsImV4cCI6MjA2NzQ0NTMyNX0.1T8HsZI1i44hNMDeJvqFktWKh3Tp4DJC2JLv6pr_lKs'
// );

// // ✅ Join Button
// const button = document.createElement('button');
// button.innerText = ' Join Speak Queue';
// Object.assign(button.style, {
//   position: 'fixed',
//   bottom: '100px',
//   right: '20px',
//   zIndex: '9999',
//   background: '#00c853',
//   color: 'white',
//   padding: '10px',
//   borderRadius: '8px',
//   border: 'none',
//   fontSize: '14px',
//   cursor: 'pointer',
// });
// document.body.appendChild(button);

// // ✅ Queue Display Box
// const queueBox = document.createElement('div');
// Object.assign(queueBox.style, {
//   position: 'fixed',
//   bottom: '160px',
//   right: '20px',
//   background: 'white',
//   border: '1px solid #ccc',
//   borderRadius: '8px',
//   padding: '10px',
//   zIndex: '9999',
//   maxHeight: '300px',
//   overflowY: 'auto',
//   fontSize: '14px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
// });
// queueBox.innerText = '🎙 Loading queue...';
// document.body.appendChild(queueBox);

// // ✅ Leave Button
// const leaveBtn = document.createElement('button');
// leaveBtn.innerText = ' Leave Queue';
// Object.assign(leaveBtn.style, {
//   marginTop: '10px',
//   background: '#ff5252',
//   color: 'white',
//   padding: '6px',
//   borderRadius: '6px',
//   border: 'none',
//   cursor: 'pointer'
// });
// queueBox.appendChild(leaveBtn);

// // ✅ Get cached name or ask once
// let cachedName = localStorage.getItem('queueName');
// if (!cachedName) {
//   cachedName = prompt('Enter your name:');
//   if (cachedName) {
//     localStorage.setItem('queueName', cachedName);
//   }
// }

// // ✅ Join button logic
// button.addEventListener('click', async () => {
//   if (!cachedName) return;
//   const { data, error } = await supabase.from('queue').insert([{ username: cachedName }]);
//   if (error) {
//     console.error('❌ Failed to insert:', error);
//   } else {
//     console.log('✅ Inserted:', data);
//   }
// });

// // ✅ Leave button logic
// leaveBtn.addEventListener('click', async () => {
//   const username = localStorage.getItem('queueName');
//   if (!username) return;
//   await supabase.from('queue').delete().eq('username', username);
// });

// // ✅ Fetch and update queue
// async function fetchQueue() {
//   const { data } = await supabase
//     .from('queue')
//     .select('*')
//     .order('created_at', { ascending: true });

//   updateQueueDisplay(data || []);
// }

// // ✅ Update display with “your turn” alert
// function updateQueueDisplay(queue) {
//   const currentUser = localStorage.getItem('queueName');

//   // Clear previous content
//   queueBox.innerHTML = '';

//   if (!queue.length) {
//     queueBox.innerText = 'No one in queue';
//     queueBox.appendChild(leaveBtn);
//     return;
//   }

//   const host = queue[0];
//   const isMeAdmin = host.username === currentUser;

//   // Set admin flag in localStorage if you're first
//   if (isMeAdmin) {
//     localStorage.setItem('queueAdmin', 'true');
//   } else {
//     localStorage.removeItem('queueAdmin');
//   }

//   // Show host message
//   const adminLine = document.createElement('div');
//   adminLine.innerHTML = ` <b>${host.username}</b> is hosting a Speak Queue`;
//   adminLine.style.marginBottom = '10px';
//   queueBox.appendChild(adminLine);

//   // Show remaining people in queue (excluding admin)
//   const others = queue.slice(1);
//   if (others.length) {
//     const queueList = others
//       .map((u, i) => `${i + 1}. ${u.username}`)
//       .join('<br>');
//     const listDiv = document.createElement('div');
//     listDiv.innerHTML = queueList;
//     queueBox.appendChild(listDiv);
//   } else {
//     const msg = document.createElement('div');
//     msg.innerText = '🎙 No one in line';
//     queueBox.appendChild(msg);
//   }

//   // Turn alert only applies to first non-admin
//   const isMyTurn = others.length > 0 && others[0].username === currentUser;
//   if (isMyTurn) {
//     if (!queueBox.dataset.alerted) {
//       alert("🎤 It's your turn to speak!");
//       queueBox.dataset.alerted = 'true';
//     }
//     queueBox.style.border = '2px solid green';
//   } else {
//     queueBox.style.border = '1px solid #ccc';
//     queueBox.dataset.alerted = '';
//   }

//   // Always add leave + optional clear button
//   queueBox.appendChild(leaveBtn);

//   if (localStorage.getItem('queueAdmin') === 'true') {
//     const clearBtn = document.createElement('button');
//     clearBtn.innerText = '🧹 Clear Queue';
//     Object.assign(clearBtn.style, {
//       marginTop: '10px',
//       background: '#555',
//       color: 'white',
//       padding: '6px',
//       border: 'none',
//       borderRadius: '6px',
//       cursor: 'pointer'
//     });

//     clearBtn.onclick = async () => {
//       const ok = confirm('Are you sure you want to clear the entire queue?');
//       if (ok) {
//         const { error } = await supabase.from('queue').delete().neq('id', '');
//         if (error) alert('❌ Failed to clear queue');
//         else alert('✅ Queue cleared');
//       }
//     };

//     queueBox.appendChild(clearBtn);
//   }
// }


// // ✅ Live updates
// supabase
//   .channel('public:queue')
//   .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, fetchQueue)
//   .subscribe();

// // ✅ Initial fetch
// fetchQueue();

// })();


// speak‑queue content script

//NOTE: gpt working - good

import { createClient } from '@supabase/supabase-js';

(async () => {
  // Only run on actual meeting pages
  const meetingUrlPattern = /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
  if (!meetingUrlPattern.test(window.location.pathname)) return;

  // Supabase config
  const supabase = createClient(
    'https://prkzycoudpeoerecdlfw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya3p5Y291ZHBlb2VyZWNkbGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjkzMjUsImV4cCI6MjA2NzQ0NTMyNX0.1T8HsZI1i44hNMDeJvqFktWKh3Tp4DJC2JLv6pr_lKs'
  );

  // Cached name
  let cachedName = localStorage.getItem('queueName');
  if (!cachedName) {
    cachedName = prompt('Enter your name:');
    if (cachedName) localStorage.setItem('queueName', cachedName);
  }

  // UI: Join Button
  const btnJoin = document.createElement('button');
  btnJoin.innerText = 'Join Speak Queue';
  Object.assign(btnJoin.style, {
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    zIndex: 9999,
    background: '#1976d2',
    color: 'white',
    padding: '12px 18px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'system-ui, sans-serif',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  });
  btnJoin.onmouseover = () => btnJoin.style.background = '#1565c0';
  btnJoin.onmouseout = () => btnJoin.style.background = '#1976d2';
  document.body.appendChild(btnJoin);

  // UI: Queue Box
  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'fixed',
    bottom: '160px',
    right: '20px',
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '16px',
    zIndex: 9999,
    maxHeight: '340px',
    width: '280px',
    overflowY: 'auto',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  });
  document.body.appendChild(box);

  // UI: Leave Button
  const btnLeave = document.createElement('button');
  btnLeave.innerText = 'Leave Queue';
  Object.assign(btnLeave.style, {
    marginTop: '20px',
    background: '#e53935',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  });
  btnLeave.onmouseover = () => btnLeave.style.background = '#c62828';
  btnLeave.onmouseout = () => btnLeave.style.background = '#e53935';
  box.appendChild(btnLeave);

  // Join queue
  btnJoin.onclick = async () => {
    if (!cachedName) return;
    await supabase.from('queue').insert([{ username: cachedName }]);
  };

  // Leave queue
  btnLeave.onclick = async () => {
    await supabase.from('queue').delete().eq('username', cachedName);
  };

  // Render queue
  function renderQueue(queue) {
    const me = cachedName;
    box.innerHTML = ''; // clear

    if (!queue.length) {
      box.innerText = 'No one in queue';
      box.appendChild(btnLeave);
      return;
    }

    const admin = queue[0];
    const others = queue.slice(1);
    const isAdmin = admin.username === me;

    // Mark self as admin if first
    localStorage.setItem('queueAdmin', isAdmin ? 'true' : '');

    const adminLine = document.createElement('div');
    adminLine.innerHTML = `<b>${admin.username}</b> is hosting the queue`;
    adminLine.style.marginBottom = '10px';
    box.appendChild(adminLine);

    // List others
    others.forEach((u, i) => {
      const line = document.createElement('div');
      const isSpeaking = i === 0 && u.username === me;

      line.innerHTML = `${i + 1}. <span style="font-weight:${isSpeaking ? 'bold' : 'normal'}; color: ${isSpeaking ? 'green' : 'black'}">${u.username}</span>`;

      // Admin Kick
      if (isAdmin) {
        const kick = document.createElement('button');
        kick.innerText = 'Kick';
        Object.assign(kick.style, {
          background: '#efefef',
          border: '1px solid #ddd',
          borderRadius: '6px',
          padding: '2px 8px',
          fontSize: '12px',
          cursor: 'pointer',
          color: '#c62828',
          marginLeft: '10px',
        });
        kick.onmouseover = () => kick.style.background = '#fddede';
        kick.onmouseout = () => kick.style.background = '#efefef';
        kick.onclick = async () => {
          await supabase.from('queue').delete().eq('username', u.username);
        };
        line.appendChild(kick);
      }

      box.appendChild(line);
    });

    // Your Turn Alert
    if (others.length && others[0].username === me && !box.dataset.alerted) {
      alert("It's your turn to speak!");
      box.dataset.alerted = 'true';
      box.style.border = '2px solid green';
    } else {
      box.dataset.alerted = '';
      box.style.border = '1px solid #ddd';
    }

    // Leave + Admin Clear All
    box.appendChild(btnLeave);

    if (isAdmin) {
      const clearAll = document.createElement('button');
      clearAll.innerText = 'Clear Queue';
      Object.assign(clearAll.style, {
        marginTop: '10px',
        background: '#555',
        color: 'white',
        padding: '6px 10px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '13px',
        cursor: 'pointer',
        marginLeft: '8px',
      });
      clearAll.onclick = async () => {
        const ok = confirm('Clear entire queue?');
        if (ok) await supabase.from('queue').delete().neq('id', '');
      };
      box.appendChild(clearAll);
    }
  }

  // Fetch and live sync
  async function fetchQueue() {
    const { data } = await supabase
      .from('queue')
      .select('*')
      .order('created_at', { ascending: true });
    renderQueue(data || []);
  }

  supabase
    .channel('public:queue')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, fetchQueue)
    .subscribe();

  fetchQueue();
})();


//NOTE: testing
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   'https://prkzycoudpeoerecdlfw.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya3p5Y291ZHBlb2VyZWNkbGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjkzMjUsImV4cCI6MjA2NzQ0NTMyNX0.1T8HsZI1i44hNMDeJvqFktWKh3Tp4DJC2JLv6pr_lKs'
// );

// // Utility: Wait until inside Google Meet (not lobby)
// function waitForMeetingJoin(callback, attempts = 0) {
//   if (document.querySelector('[aria-label="Meeting details"]')) {
//     callback();
//   } else if (attempts < 20) {
//     setTimeout(() => waitForMeetingJoin(callback, attempts + 1), 500);
//   } else {
//     console.log('Meeting not joined — skipping Speak Queue');
//   }
// }

// // Only trigger on actual Google Meet URLs
// const meetingUrlPattern = /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
// if (!meetingUrlPattern.test(window.location.pathname)) {
//   console.log('Not a Google Meet — exiting');
// } else {
//   waitForMeetingJoin(initSpeakQueue);
// }

// // MAIN FUNCTION
// async function initSpeakQueue() {
//   console.log('Initializing Speak Queue...');

//   // Setup UI elements
//   const button = document.createElement('button');
//   button.textContent = 'Join Speak Queue';
//   Object.assign(button.style, {
//     position: 'fixed',
//     bottom: '100px',
//     right: '20px',
//     zIndex: '9999',
//     background: '#0a84ff',
//     color: 'white',
//     padding: '10px 14px',
//     borderRadius: '8px',
//     border: 'none',
//     fontSize: '14px',
//     cursor: 'pointer',
//   });
//   document.body.appendChild(button);

//   const queueBox = document.createElement('div');
//   Object.assign(queueBox.style, {
//     position: 'fixed',
//     bottom: '160px',
//     right: '20px',
//     background: 'white',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     padding: '10px',
//     zIndex: '9999',
//     maxHeight: '300px',
//     overflowY: 'auto',
//     fontSize: '14px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
//     width: '220px'
//   });
//   queueBox.textContent = 'Loading queue...';
//   document.body.appendChild(queueBox);

//   const leaveBtn = document.createElement('button');
//   leaveBtn.textContent = 'Leave Queue';
//   Object.assign(leaveBtn.style, {
//     marginTop: '10px',
//     background: '#e53935',
//     color: 'white',
//     padding: '6px',
//     borderRadius: '6px',
//     border: 'none',
//     cursor: 'pointer',
//     width: '100%'
//   });

//   queueBox.appendChild(leaveBtn);

//   // Get user name
//   let cachedName = localStorage.getItem('queueName');
//   if (!cachedName) {
//     cachedName = prompt('Enter your name:');
//     if (cachedName) {
//       localStorage.setItem('queueName', cachedName);
//     }
//   }

//   // JOIN Queue
//   button.addEventListener('click', async () => {
//     if (!cachedName) return;
//     await supabase.from('queue').insert([{ username: cachedName }]);
//   });

//   // LEAVE Queue
//   leaveBtn.addEventListener('click', async () => {
//     const username = localStorage.getItem('queueName');
//     if (!username) return;
//     await supabase.from('queue').delete().eq('username', username);
//   });

//   // FETCH + UPDATE
//   async function fetchQueue() {
//     const { data } = await supabase
//       .from('queue')
//       .select('*')
//       .order('created_at', { ascending: true });

//     updateQueueUI(data || []);
//   }

//   // UI Rendering
//   function updateQueueUI(queue) {
//     const me = localStorage.getItem('queueName');
//     queueBox.innerHTML = '';

//     if (!queue.length) {
//       queueBox.textContent = 'No one in queue';
//       queueBox.appendChild(leaveBtn);
//       return;
//     }

//     const host = queue[0];
//     const isMeAdmin = host.username === me;

//     // Save admin flag
//     if (isMeAdmin) {
//       localStorage.setItem('queueAdmin', 'true');
//     } else {
//       localStorage.removeItem('queueAdmin');
//     }

//     // Host line
//     const adminLine = document.createElement('div');
//     adminLine.innerHTML = `<strong>${host.username}</strong> is hosting a Speak Queue`;
//     adminLine.style.marginBottom = '10px';
//     queueBox.appendChild(adminLine);

//     const others = queue.slice(1);
//     const currentUser = localStorage.getItem('queueName');
//     const isMyTurn = others.length > 0 && others[0].username === currentUser;

//     const listDiv = document.createElement('div');
//     if (others.length) {
//       listDiv.innerHTML = others
//         .map((u, i) => {
//           const name = u.username === currentUser ? `<strong>${u.username}</strong>` : u.username;
//           return `${i + 1}. ${name}`;
//         })
//         .join('<br>');
//     } else {
//       listDiv.textContent = 'No one in line';
//     }

//     queueBox.appendChild(listDiv);

//     // Your turn
//     if (isMyTurn) {
//       if (!queueBox.dataset.alerted) {
//         alert("It's your turn to speak!");
//         queueBox.dataset.alerted = 'true';
//       }
//       queueBox.style.border = '2px solid green';
//     } else {
//       queueBox.style.border = '1px solid #ccc';
//       queueBox.dataset.alerted = '';
//     }

//     // Leave + Admin Controls
//     queueBox.appendChild(leaveBtn);

//     if (localStorage.getItem('queueAdmin') === 'true') {
//       const clearBtn = document.createElement('button');
//       clearBtn.textContent = 'Clear Queue';
//       Object.assign(clearBtn.style, {
//         marginTop: '8px',
//         background: '#444',
//         color: 'white',
//         padding: '6px',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         width: '100%'
//       });

//       clearBtn.onclick = async () => {
//         const ok = confirm('Are you sure you want to clear the queue?');
//         if (ok) {
//           await supabase.from('queue').delete().neq('id', '');
//         }
//       };

//       queueBox.appendChild(clearBtn);
//     }
//   }

//   // Live listener
//   supabase
//     .channel('public:queue')
//     .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, fetchQueue)
//     .subscribe();

//   fetchQueue(); // initial load
// }

//NOTE: final

// import { createClient } from '@supabase/supabase-js';

// (async () => {
//   // Only run on actual meeting pages
//   // const meetingUrlPattern = /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
//   // if (!meetingUrlPattern.test(window.location.pathname)) return;

//   const meetingUrlPattern = /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
//   if (!meetingUrlPattern.test(window.location.pathname)) {
//     console.log('Not a Google Meet — exiting');
//   } else {
//     waitForMeetingJoin(initSpeakQueue);
//   }

//   // Supabase config
//   const supabase = createClient(
//     'https://prkzycoudpeoerecdlfw.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya3p5Y291ZHBlb2VyZWNkbGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjkzMjUsImV4cCI6MjA2NzQ0NTMyNX0.1T8HsZI1i44hNMDeJvqFktWKh3Tp4DJC2JLv6pr_lKs'
//   );

//   // Cached name
//   let cachedName = localStorage.getItem('queueName');
//   if (!cachedName) {
//     cachedName = prompt('Enter your name:');
//     if (cachedName) localStorage.setItem('queueName', cachedName);
//   }

//   // UI: Join Button
//   const btnJoin = document.createElement('button');
//   btnJoin.innerText = 'Join Speak Queue';
//   Object.assign(btnJoin.style, {
//     position: 'fixed',
//     bottom: '100px',
//     right: '20px',
//     zIndex: '9999',
//     background: '#0a84ff',
//     color: 'white',
//     padding: '10px 14px',
//     borderRadius: '8px',
//     border: 'none',
//     fontSize: '14px',
//     cursor: 'pointer',
//   });
//   btnJoin.onmouseover = () => btnJoin.style.background = '#1565c0';
//   btnJoin.onmouseout = () => btnJoin.style.background = '#1976d2';
//   document.body.appendChild(btnJoin);

//   // UI: Queue Box
//   const box = document.createElement('div');
//   Object.assign(box.style, {
//     position: 'fixed',
//     bottom: '160px',
//     right: '20px',
//     background: 'white',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     padding: '10px',
//     zIndex: '9999',
//     maxHeight: '300px',
//     overflowY: 'auto',
//     fontSize: '14px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
//     width: '220px'
//   });
//   document.body.appendChild(box);

//   // UI: Leave Button
//   const btnLeave = document.createElement('button');
//   btnLeave.innerText = 'Leave Queue';
//   Object.assign(btnLeave.style, {
//     marginTop: '10px',
//     background: '#e53935',
//     color: 'white',
//     padding: '6px',
//     borderRadius: '6px',
//     border: 'none',
//     cursor: 'pointer',
//     width: '100%'
//   });
//   btnLeave.onmouseover = () => btnLeave.style.background = '#c62828';
//   btnLeave.onmouseout = () => btnLeave.style.background = '#e53935';
//   box.appendChild(btnLeave);

//   // Join queue
//   btnJoin.onclick = async () => {
//     if (!cachedName) return;
//     await supabase.from('queue').insert([{ username: cachedName }]);
//   };

//   // Leave queue
//   btnLeave.onclick = async () => {
//     await supabase.from('queue').delete().eq('username', cachedName);
//   };

//   // Render queue
//   function renderQueue(queue) {
//     const me = cachedName;
//     box.innerHTML = ''; // clear

//     if (!queue.length) {
//       box.innerText = 'No one in queue';
//       box.appendChild(btnLeave);
//       return;
//     }

//     const admin = queue[0];
//     const others = queue.slice(1);
//     const isAdmin = admin.username === me;

//     // Mark self as admin if first
//     localStorage.setItem('queueAdmin', isAdmin ? 'true' : '');

//     const adminLine = document.createElement('div');
//     adminLine.innerHTML = `<b>${admin.username}</b> is hosting the queue`;
//     adminLine.style.marginBottom = '10px';
//     box.appendChild(adminLine);

//     // List others
//     others.forEach((u, i) => {
//       const line = document.createElement('div');
//       const isSpeaking = i === 0 && u.username === me;

//       line.innerHTML = `${i + 1}. <span style="font-weight:${isSpeaking ? 'bold' : 'normal'}; color: ${isSpeaking ? 'green' : 'black'}">${u.username}</span>`;

//       // Admin Kick
//       if (isAdmin) {
//         const kick = document.createElement('button');
//         kick.innerText = 'Kick';
//         Object.assign(kick.style, {
//           background: '#efefef',
//           border: '1px solid #ddd',
//           borderRadius: '6px',
//           padding: '2px 8px',
//           fontSize: '12px',
//           cursor: 'pointer',
//           color: '#c62828',
//           marginLeft: '10px',
//         });
//         kick.onmouseover = () => kick.style.background = '#fddede';
//         kick.onmouseout = () => kick.style.background = '#efefef';
//         kick.onclick = async () => {
//           await supabase.from('queue').delete().eq('username', u.username);
//         };
//         line.appendChild(kick);
//       }

//       box.appendChild(line);
//     });

//     // Your Turn Alert
//     if (others.length && others[0].username === me && !box.dataset.alerted) {
//       alert("It's your turn to speak!");
//       box.dataset.alerted = 'true';
//       box.style.border = '2px solid green';
//     } else {
//       box.dataset.alerted = '';
//       box.style.border = '1px solid #ddd';
//     }

//     // Leave + Admin Clear All
//     box.appendChild(btnLeave);

//     if (isAdmin) {
//       const clearAll = document.createElement('button');
//       clearAll.innerText = 'Clear Queue';
//       Object.assign(clearAll.style, {
//   marginTop: '8px',
//   background: '#444',
//   color: 'white',
//   padding: '6px',
//   border: 'none',
//   borderRadius: '6px',
//   cursor: 'pointer',
//   width: '100%'
//       });
//       clearAll.onclick = async () => {
//         const ok = confirm('Clear entire queue?');
//         if (ok) await supabase.from('queue').delete().neq('id', '');
//       };
//       box.appendChild(clearAll);
//     }
//   }

//   // Fetch and live sync
//   async function fetchQueue() {
//     const { data } = await supabase
//       .from('queue')
//       .select('*')
//       .order('created_at', { ascending: true });
//     renderQueue(data || []);
//   }

//   supabase
//     .channel('public:queue')
//     .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, fetchQueue)
//     .subscribe();

//   fetchQueue();
// })();