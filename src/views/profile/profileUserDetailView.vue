<template>

    <button class="theme-toggle-btn" id="themeToggle" onclick="toggleTheme()">
        <i class="bi bi-moon-fill" id="themeIcon"></i>
    </button>

    <div class="container py-4">
        <!-- Page Header -->
        <div class="page-header animate-fade-in">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><i class="bi bi-house-door me-1"></i>Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Posts</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Post Detail #2</li>
                </ol>
            </nav>
            <h1 class="page-title">User Profile</h1>
        </div>

        <!-- Main Content -->
        <div class="row g-4">
            <!-- Sidebar -->
            <div class="col-lg-4">
                <div class="profile-sidebar animate-slide-left">
                    <!-- Profile Card -->
                    <div class="custom-card profile-card mb-4">
                        <div class="avatar-wrapper">
                            <img src="http://novia.csm.linkpc.net/storage/avatars/ijDt4TcKrvJHN9SheW8b5rdNLNpHR4tcpCIOPeWl.png"
                                alt="dammm" class="avatar-img"
                                onerror="this.src='https://ui-avatars.com/api/?name=dammm&size=140&background=4f46e5&color=fff'">
                            <span class="status-badge"></span>
                        </div>

                        <h2 class="profile-name">dammm</h2>
                        <p class="profile-id">User ID: #11</p>

                        <div class="mb-3">
                            <span class="badge-custom">
                                <i class="bi bi-person-check"></i>
                                Male
                            </span>
                        </div>
                    </div>

                    <!-- Personal Information -->
                    <div class="custom-card profile-card">
                        <h3 class="section-title">Personal Information</h3>

                        <ul class="info-list">
                            <li class="info-list-item">
                                <div class="info-icon">
                                    <i class="bi bi-envelope"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Email Address</div>
                                    <div class="info-value">
                                        <a href="mailto:chendomrey@gmail.com">chendomrey@gmail.com</a>
                                    </div>
                                </div>
                            </li>

                            <li class="info-list-item">
                                <div class="info-icon">
                                    <i class="bi bi-telephone"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Phone Number</div>
                                    <div class="info-value">
                                        <a href="tel:09876543">09876543</a>
                                    </div>
                                </div>
                            </li>

                            <li class="info-list-item">
                                <div class="info-icon">
                                    <i class="bi bi-calendar-event"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Date of Birth</div>
                                    <div class="info-value">January 1, 1978</div>
                                </div>
                            </li>

                            <li class="info-list-item">
                                <div class="info-icon">
                                    <i class="bi bi-geo-alt"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Current City</div>
                                    <div class="info-value">Phnom Penh</div>
                                </div>
                            </li>

                            <li class="info-list-item">
                                <div class="info-icon">
                                    <i class="bi bi-house"></i>
                                </div>
                                <div class="info-content">
                                    <div class="info-label">Home Town</div>
                                    <div class="info-value">Kandal</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-8">
                <div class="animate-slide-right">
                    <!-- Post Card -->
                    <div class="custom-card post-card mb-4">
                        <div class="post-header">
                            <img src="http://novia.csm.linkpc.net/storage/avatars/ijDt4TcKrvJHN9SheW8b5rdNLNpHR4tcpCIOPeWl.png"
                                alt="dammm" class="post-avatar"
                                onerror="this.src='https://ui-avatars.com/api/?name=dammm&size=56&background=4f46e5&color=fff'">
                            <div class="post-author-info">
                                <h5>dammm</h5>
                                <div class="post-date">
                                    <i class="bi bi-clock"></i>
                                    January 13, 2026 at 8:52 AM
                                </div>
                            </div>
                        </div>

                        <div class="post-content">
                            <p class="post-text">Test update</p>

                            <div class="post-image-wrapper">
                                <img src="http://novia.csm.linkpc.net/storage/posts/fYX95XV8rGubqdfCGTMHPr8QoS8DwLlhuY7b2fHi.jpg"
                                    alt="Post Image" class="post-img"
                                    onerror="this.src='https://via.placeholder.com/800x450/4f46e5/ffffff?text=Post+Image'">
                            </div>

                            <div class="stats-group">
                                <span class="stat-badge">
                                    <i class="bi bi-heart"></i>
                                    0 Likes
                                </span>
                                <span class="stat-badge">
                                    <i class="bi bi-chat-dots"></i>
                                    0 Comments
                                </span>
                                <span class="stat-badge">
                                    <i class="bi bi-share"></i>
                                    0 Shares
                                </span>
                            </div>
                        </div>

                        <div class="post-footer">
                            <div class="post-actions">
                                <button class="btn-action">
                                    <i class="bi bi-heart"></i>
                                    Like
                                </button>
                                <button class="btn-action">
                                    <i class="bi bi-chat-dots"></i>
                                    Comment
                                </button>
                                <button class="btn-action">
                                    <i class="bi bi-share"></i>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Attachments -->
                    <div class="custom-card attachment-card">
                        <h3 class="section-title">Attachments</h3>

                        <div class="attachment-preview">
                            <img src="http://novia.csm.linkpc.net/storage/attachments/HFIPKNbojfT9QCnyIWV4SV4nU0Gz5EWI0YyqC0zG.jpg"
                                alt="Attachment" class="attachment-img"
                                onerror="this.src='https://via.placeholder.com/800x400/4f46e5/ffffff?text=Attachment'">
                        </div>

                        <div class="attachment-info">
                            <div class="attachment-icon">
                                <i class="bi bi-file-earmark-image"></i>
                            </div>
                            <div class="attachment-details">
                                <h6>Attachment Image</h6>
                                <p class="attachment-meta">
                                    <i class="bi bi-paperclip me-1"></i>
                                    Image File • JPG
                                </p>
                            </div>
                            <a href="http://novia.csm.linkpc.net/storage/attachments/HFIPKNbojfT9QCnyIWV4SV4nU0Gz5EWI0YyqC0zG.jpg"
                                class="btn-action ms-auto" download>
                                <i class="bi bi-download"></i>
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
// Theme Toggle Function
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');

    html.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    }
});

// Add stagger animation delay to list items
document.addEventListener('DOMContentLoaded', function () {
    const infoItems = document.querySelectorAll('.info-list-item');
    infoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fade-up');
    });
});
</script>


<style scoped>

/* Custom animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}

.animate-fade-up {
    animation: fadeInUp 0.6s ease-out;
}

.animate-slide-left {
    animation: slideInLeft 0.6s ease-out;
}

.animate-slide-right {
    animation: slideInRight 0.6s ease-out;
}

/* Theme Toggle Button */
.theme-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.theme-toggle-btn:hover {
    background: var(--color-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.theme-toggle-btn i {
    font-size: 1.25rem;
    color: var(--color-text);
}

/* Custom Card Styles */
.custom-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    transition: all 0.3s ease;
}

.custom-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

/* Header */
.page-header {
    padding: 40px 0 30px;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 40px;
}

.page-title {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
    letter-spacing: -0.02em;
}

.breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0;
}

.breadcrumb-item {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
}

.breadcrumb-item a {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
}

.breadcrumb-item a:hover {
    color: var(--color-accent);
}

.breadcrumb-item.active {
    color: var(--color-text);
}

.breadcrumb-item+.breadcrumb-item::before {
    color: var(--color-muted);
}

/* Profile Card */
.profile-sidebar {
    position: sticky;
    top: 20px;
}

.profile-card {
    padding: 32px;
    text-align: center;
}

.avatar-wrapper {
    position: relative;
    width: 140px;
    height: 140px;
    margin: 0 auto 24px;
}

.avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--color-border);
    transition: all 0.3s ease;
}

.avatar-wrapper:hover .avatar-img {
    transform: scale(1.05);
    border-color: var(--color-accent);
}

.status-badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: var(--color-success);
    border: 4px solid var(--color-surface);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }

    50% {
        box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
    }
}

.profile-name {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
}

.profile-id {
    font-size: 0.875rem;
    color: var(--color-muted);
    margin-bottom: 24px;
}

.badge-custom {
    background: var(--color-hover);
    color: var(--color-text-secondary);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.813rem;
    font-weight: 500;
    border: 1px solid var(--color-border);
}

.badge-custom i {
    margin-right: 4px;
}

/* Info List */
.info-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.info-list-item {
    display: flex;
    align-items: flex-start;
    padding: 14px 0;
    border-bottom: 1px solid var(--color-border);
    transition: all 0.2s ease;
}

.info-list-item:last-child {
    border-bottom: none;
}

.info-list-item:hover {
    padding-left: 8px;
    background: var(--color-hover);
    margin: 0 -16px;
    padding-right: 16px;
    padding-left: 24px;
    border-radius: 8px;
}

.info-icon {
    width: 40px;
    height: 40px;
    background: var(--color-hover);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    flex-shrink: 0;
    transition: all 0.2s ease;
}

.info-list-item:hover .info-icon {
    background: var(--color-accent);
    color: white;
}

.info-icon i {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
}

.info-list-item:hover .info-icon i {
    color: white;
}

.info-content {
    flex: 1;
}

.info-label {
    font-size: 0.813rem;
    color: var(--color-text-tertiary);
    margin-bottom: 2px;
    font-weight: 500;
}

.info-value {
    font-size: 0.938rem;
    color: var(--color-text);
    font-weight: 500;
}

.info-value a {
    color: var(--color-accent);
    text-decoration: none;
    transition: all 0.2s ease;
}

.info-value a:hover {
    color: var(--color-accent-light);
    text-decoration: underline;
}

/* Section Title */
.section-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-muted);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-border);
}

/* Post Card */
.post-card {
    padding: 32px;
}

.post-header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
}

.post-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-border);
    margin-right: 16px;
}

.post-author-info h5 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 4px;
}

.post-date {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
}

.post-date i {
    margin-right: 6px;
}

.post-content {
    margin-bottom: 24px;
}

.post-text {
    font-size: 1.063rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin-bottom: 24px;
}

.post-image-wrapper {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
}

.post-image-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.post-image-wrapper:hover::before {
    opacity: 1;
}

.post-img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
}

.post-image-wrapper:hover .post-img {
    transform: scale(1.02);
}

.post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
}

.post-actions {
    display: flex;
    gap: 12px;
}

.btn-action {
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-action:hover {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-action i {
    font-size: 1rem;
}

/* Attachment Card */
.attachment-card {
    padding: 24px;
}

.attachment-preview {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;
    background: var(--color-hover);
}

.attachment-img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
}

.attachment-preview:hover .attachment-img {
    transform: scale(1.05);
}

.attachment-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.attachment-icon {
    width: 48px;
    height: 48px;
    background: var(--color-hover);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.attachment-icon i {
    font-size: 1.5rem;
    color: var(--color-accent);
}

.attachment-details h6 {
    font-size: 0.938rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 4px;
}

.attachment-meta {
    font-size: 0.813rem;
    color: var(--color-text-tertiary);
}

/* Stats Badge */
.stats-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.stat-badge {
    background: var(--color-hover);
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    font-weight: 500;
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
}

.stat-badge:hover {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
    transform: translateY(-2px);
}

.stat-badge i {
    margin-right: 6px;
}

/* Responsive */
@media (max-width: 991px) {
    .profile-sidebar {
        position: relative;
        top: 0;
        margin-bottom: 24px;
    }

    .page-title {
        font-size: 2rem;
    }
}

@media (max-width: 576px) {
    .page-header {
        padding: 24px 0 20px;
    }

    .page-title {
        font-size: 1.75rem;
    }

    .profile-card {
        padding: 24px;
    }

    .post-card {
        padding: 24px;
    }

    .post-actions {
        flex-direction: column;
        width: 100%;
    }

    .btn-action {
        width: 100%;
        justify-content: center;
    }
}
</style>